import { useData } from 'vitepress';
import { computed, onMounted, ref } from 'vue';
import { requestStats } from './useSiteStats';
import { toUrlPath } from '../../support/url.js';

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
