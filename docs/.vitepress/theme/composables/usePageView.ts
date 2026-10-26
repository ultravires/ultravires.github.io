import { useData } from 'vitepress';
import { computed, onMounted, ref } from 'vue';
import { requestStats } from './useSiteStats';

/** 由 page.relativePath（如 ai/xxx.md）推导 cleanUrls 下的站点路径 */
export function toUrlPath(relativePath: string): string {
  const stripped = relativePath.replace(/\.md$/, '');
  if (stripped === 'index') return '/';
  if (stripped.endsWith('/index')) {
    return `/${stripped.slice(0, -'index'.length)}`;
  }
  return `/${stripped}`;
}

/** 当前文章页的累计阅读数（PV），栏目索引页不统计展示 */
export function usePageView() {
  const { page } = useData();

  const pv = ref<number | null>(null);
  const failed = ref(false);

  const isArticle = computed(
    () =>
      page.value.relativePath.length > 0 &&
      !page.value.relativePath.endsWith('index.md')
  );
  const path = computed(() => toUrlPath(page.value.relativePath));

  onMounted(async () => {
    if (!isArticle.value) return;
    try {
      const data = await requestStats<{ path: string; pv: number }>(
        `/api/pageview?path=${encodeURIComponent(path.value)}`
      );
      pv.value = data.pv;
    } catch {
      failed.value = true;
    }
  });

  return { pv, failed, isArticle };
}
