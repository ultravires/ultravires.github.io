import { onMounted, ref, type Ref } from 'vue';

// 统计数据由 la-stats-proxy worker 提供（见 workers/la-stats-proxy），
// 本地联调可用 VITE_STATS_API=http://localhost:8787 指向 wrangler dev
const STATS_API_BASE: string =
  import.meta.env.VITE_STATS_API ?? 'https://stats.ultravires.me';

export interface OverviewData {
  today: { pv: number; uv: number };
  yesterday: { pv: number; uv: number };
  total: { pv: number; uv: number };
  online: number;
  updatedAt: string;
}

export interface TopPageItem {
  path: string;
  title: string | null;
  pv: number;
  uv: number;
}

export interface RatioItem {
  name: string;
  ratio: number;
}

export interface ProfileData {
  regions: RatioItem[];
  devices: RatioItem[];
  referrers: RatioItem[];
}

interface StatsFetchResult<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  failed: Ref<boolean>;
}

export async function requestStats<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${STATS_API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`统计接口响应 ${response.status}`);
  }
  return (await response.json()) as T;
}

function useStatsFetch<T>(endpoint: string): StatsFetchResult<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref(true);
  const failed = ref(false);

  // 仅在客户端拉取，SSG 构建阶段不请求
  onMounted(async () => {
    try {
      data.value = await requestStats<T>(endpoint);
    } catch {
      failed.value = true;
    } finally {
      loading.value = false;
    }
  });

  return { data, loading, failed };
}

export function useOverview(): StatsFetchResult<OverviewData> {
  return useStatsFetch<OverviewData>('/api/overview');
}

export function useTopPages(
  limit = 10
): StatsFetchResult<{ pages: TopPageItem[] }> {
  return useStatsFetch<{ pages: TopPageItem[] }>(
    `/api/top-pages?limit=${limit}`
  );
}

export function useVisitorProfile(): StatsFetchResult<ProfileData> {
  return useStatsFetch<ProfileData>('/api/profile');
}
