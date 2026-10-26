// 51.la 站点统计数据代理
//
// 为博客前台「站点统计」页（/stats/）与文章阅读数提供只读 JSON 接口：
//   GET  /api/overview            概览：今日/昨日/累计 PV、UV，当前在线人数
//   GET  /api/top-pages?limit=10  热门页面 Top N（近 30 天，按 PV 排序）
//   GET  /api/profile             访客画像摘要：地域 / 设备 / 来源
//   GET  /api/pageview?path=/xxx  单个页面近 30 天 PV（文章头部「阅读 N 次」）
//   POST /api/refresh             手动刷新快照（请求头 X-Refresh-Token 鉴权）
//
// 51.la 开放数据 API 免费额度仅 100 次/月，因此数据由 Cron Trigger 每 2 天
// 批量拉取一次（6 个调用 ≈ 90 次/月）写入 KV；GET 接口只读 KV，不消耗配额。

const LA_API_BASE = 'https://v6-open.51.la/open';
// 站点掩码 ID，与统计代码 LA.init 的 id 相同（公开信息，非密钥）
const MASK_ID = '3Rd8pMdFFdPLdgHh';

const ALLOWED_ORIGINS = [
  'https://www.ultravires.me',
  'https://ultravires.me',
  'http://localhost:5173'
];

const KV_KEYS = {
  overview: 'overview',
  topPages: 'top-pages',
  profile: 'profile',
  // 页面路径 → { pv, uv, title } 映射（受访页快照，近 30 天，最多 100 条）
  pageviews: 'pageviews'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') ?? '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === '/api/refresh' && request.method === 'POST') {
      return handleRefresh(env, request.headers.get('X-Refresh-Token'), origin);
    }

    if (request.method !== 'GET') {
      return json({ error: 'not_found' }, 404, origin);
    }

    switch (url.pathname) {
      case '/api/overview':
        return serveKv(env, KV_KEYS.overview, origin);
      case '/api/top-pages':
        return serveTopPages(env, url, origin);
      case '/api/profile':
        return serveKv(env, KV_KEYS.profile, origin);
      case '/api/pageview':
        return servePageView(env, url, origin);
      default:
        return json({ error: 'not_found' }, 404, origin);
    }
  },

  // Cron Trigger：每 2 天拉取一次快照（见 wrangler.toml triggers）
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(collectAll(env));
  }
};

// ---- 快照采集：一次 6 个 API 调用 ----

async function collectAll(env) {
  const endDay = cstDate(0);
  const startDay = cstDate(-29);

  const [overviewRes, interviewRes, terminalRes, srcRes, regionRes, activeRes] =
    await Promise.all([
      fetchLaApi('/overview/get', {}, env),
      fetchLaApi('/content/listInterview', {
        startDay,
        endDay,
        page: 1,
        size: 100
      }, env),
      fetchLaApi('/online/data', { type: 'TERMINAL', minute: 30 }, env),
      fetchLaApi('/online/data', { type: 'SRC', minute: 30 }, env),
      fetchLaApi('/online/data', { type: 'REGION', minute: 30 }, env),
      fetchLaApi('/online/data', { type: 'ACTIVE_USER', minute: 5 }, env)
    ]);

  const bean = overviewRes.bean ?? {};
  const overview = {
    today: { pv: num(bean.curPv), uv: num(bean.curUv) },
    yesterday: { pv: num(bean.beforePv), uv: num(bean.beforeUv) },
    total: { pv: num(bean.totalPv), uv: num(bean.totalUv) },
    online: num(activeRes.bean?.totalCount),
    updatedAt: new Date().toISOString()
  };

  const pages = (Array.isArray(interviewRes.data) ? interviewRes.data : [])
    .map((item) => ({
      path: String(item?.path ?? ''),
      title: item?.title ? String(item.title) : null,
      pv: num(item?.pv),
      uv: num(item?.uv)
    }))
    .filter((item) => item.path)
    .sort((a, b) => b.pv - a.pv);

  const pageviews = Object.fromEntries(
    pages.map((item) => [item.path, { pv: item.pv, uv: item.uv }])
  );

  const profile = {
    regions: toRatios(regionRes.bean?.topList),
    devices: toRatios(terminalRes.bean?.topList),
    referrers: toRatios(srcRes.bean?.topList)
  };

  await Promise.all([
    env.STATS_KV.put(KV_KEYS.overview, JSON.stringify(overview)),
    env.STATS_KV.put(KV_KEYS.topPages, JSON.stringify({ pages })),
    env.STATS_KV.put(KV_KEYS.profile, JSON.stringify(profile)),
    env.STATS_KV.put(KV_KEYS.pageviews, JSON.stringify(pageviews))
  ]);

  return { pageCount: pages.length, updatedAt: overview.updatedAt };
}

// ---- 51.la 开放数据 API（POST + JSON，签名 = SHA256HEX 大写） ----

async function fetchLaApi(path, params, env) {
  const accessKey = env.LA_ACCESS_KEY;
  const secretKey = env.LA_SECRET_KEY;
  if (!accessKey || !secretKey) {
    throw new Error('LA_ACCESS_KEY / LA_SECRET_KEY 未配置');
  }

  const nonce = Math.random().toString(36).slice(2, 6);
  const timestamp = String(Date.now());
  const body = {
    maskId: MASK_ID,
    ...params,
    accessKey,
    nonce,
    timestamp,
    sign: await sign(accessKey, nonce, secretKey, timestamp)
  };

  const response = await fetch(`${LA_API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data || data.success !== true) {
    throw new Error(
      `51.la ${path} 调用失败: ${data?.code ?? response.status} ${data?.message ?? ''}`
    );
  }
  return data;
}

// 原始签名串按字典序拼装：accessKey&nonce&secretKey&timestamp，SHA256HEX 后大写
async function sign(accessKey, nonce, secretKey, timestamp) {
  const raw = `accessKey=${accessKey}&nonce=${nonce}&secretKey=${secretKey}&timestamp=${timestamp}`;
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(raw)
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

// ---- 各 GET 端点：只读 KV ----

async function serveKv(env, key, origin) {
  const text = await env.STATS_KV.get(key);
  if (!text) {
    return json({ error: 'no_data', message: '统计数据尚未生成，等待首次快照' }, 503, origin);
  }
  const headers = corsHeaders(origin);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(text, { status: 200, headers });
}

async function serveTopPages(env, url, origin) {
  const limit = clampInt(url.searchParams.get('limit'), 10, 1, 50);
  const text = await env.STATS_KV.get(KV_KEYS.topPages);
  if (!text) {
    return json({ error: 'no_data', message: '统计数据尚未生成，等待首次快照' }, 503, origin);
  }
  const { pages } = JSON.parse(text);
  return json({ pages: (pages ?? []).slice(0, limit) }, 200, origin);
}

async function servePageView(env, url, origin) {
  const path = url.searchParams.get('path');
  if (!path || !path.startsWith('/')) {
    return json({ error: 'bad_request', message: '缺少合法的 path 参数' }, 400, origin);
  }
  const text = await env.STATS_KV.get(KV_KEYS.pageviews);
  const pageviews = text ? JSON.parse(text) : {};
  const record = pageviews[path] ?? pageviews[path.replace(/\/$/, '')];
  if (!record) {
    // 不在近 30 天受访页快照中，前台据此静默隐藏阅读数
    return json({ error: 'not_found' }, 404, origin);
  }
  return json({ path, pv: record.pv, uv: record.uv }, 200, origin);
}

// 手动刷新快照：携带 SecretKey 作为令牌，注意每次刷新消耗 6 次 API 配额
async function handleRefresh(env, token, origin) {
  if (!env.LA_SECRET_KEY || token !== env.LA_SECRET_KEY) {
    return json({ error: 'unauthorized' }, 401, origin);
  }
  try {
    const result = await collectAll(env);
    return json({ ok: true, ...result }, 200, origin);
  } catch (error) {
    return json(
      { error: 'upstream_unavailable', message: String(error?.message ?? error) },
      502,
      origin
    );
  }
}

// ---- 工具函数 ----

function toRatios(list) {
  if (!Array.isArray(list) || list.length === 0) return [];
  const total = list.reduce((sum, item) => sum + num(item?.value), 0);
  return list.slice(0, 10).map((item) => ({
    name: String(item?.name ?? '未知'),
    ratio: total > 0 ? Math.min(1, num(item?.value) / total) : 0
  }));
}

// 按北京时间（UTC+8）取 YYYY-MM-DD，offsetDays 为相对今天的天数偏移
function cstDate(offsetDays) {
  const ms = Date.now() + 8 * 3600 * 1000 + offsetDays * 24 * 3600 * 1000;
  return new Date(ms).toISOString().slice(0, 10);
}

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function clampInt(value, fallback, min, max) {
  const n = Number.parseInt(value ?? '', 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function corsHeaders(origin) {
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Refresh-Token',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  });
  if (ALLOWED_ORIGINS.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }
  return headers;
}

function json(data, status, origin) {
  const headers = corsHeaders(origin);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { status, headers });
}
