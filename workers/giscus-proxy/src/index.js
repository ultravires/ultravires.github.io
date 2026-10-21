const UPSTREAM = 'https://giscus.app';
const UPSTREAM_HOST = 'giscus.app';

// 需要直接透传到真实 giscus.app 的路径：
// OAuth 登录全程在真实域名完成（state cookie 与注册的 callback 都绑定 giscus.app），
// 授权成功后 giscus 会把 token 拼在博客页面 URL 的 ?giscus= 参数里带回，
// 由博客顶层页面写入 localStorage，再作为 session 参数传给评论区 iframe。
const PASSTHROUGH_PATHS = ['/api/oauth/authorize'];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const selfOrigin = url.origin;

    if (PASSTHROUGH_PATHS.includes(url.pathname)) {
      return Response.redirect(UPSTREAM + url.pathname + url.search, 302);
    }

    const headers = new Headers(request.headers);
    for (const name of headers.keys()) {
      if (name.startsWith('cf-') || name === 'cdn-loop') headers.delete(name);
    }

    const upstreamUrl = UPSTREAM + url.pathname + url.search;
    const hasBody = !['GET', 'HEAD'].includes(request.method);
    const response = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: hasBody ? request.body : undefined,
      redirect: 'manual'
    });

    const out = new Headers(response.headers);
    const location = out.get('location');
    if (location) {
      out.set('location', location.replaceAll(UPSTREAM, selfOrigin));
    }
    const cookies = out.getSetCookie();
    if (cookies.length) {
      out.delete('set-cookie');
      for (const cookie of cookies) {
        out.append(
          'set-cookie',
          cookie.replaceAll(`Domain=${UPSTREAM_HOST}`, `Domain=${url.host}`)
        );
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: out
    });
  }
};
