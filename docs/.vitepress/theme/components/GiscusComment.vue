<script lang="ts" setup>
import Giscus from '@giscus/vue';
import { useRoute } from 'vitepress';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const route = useRoute();

// 站点暗色模式挂在 <html data-theme> 上（见 useTheme.ts），而非 VitePress 的 .dark class
const isDark = ref(false);
let observer: MutationObserver | undefined;

onMounted(() => {
  const root = document.documentElement;
  const sync = () => (isDark.value = root.dataset.theme === 'dark');
  sync();
  observer = new MutationObserver(sync);
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
});

onUnmounted(() => observer?.disconnect());

// 评论框内部配色走 giscus 自定义主题：theme 传 CSS URL（文件在 docs/src/public/，构建后发布到站点根）
// dev 下指向本地 dev server 以便实时预览；SSR 阶段无 window，回退到线上地址（此时主题尚未真正渲染）
const giscusTheme = computed(() => {
  const file = isDark.value ? 'giscus-theme-dark.css' : 'giscus-theme-light.css';
  const origin =
    import.meta.env.DEV && typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ultravires.github.io';
  return `${origin}/${file}`;
});
</script>

<template>
  <!-- SPA 路由切换后按新页面重新挂载评论串 -->
  <div
    class="mt-6 rounded-xl border border-slate-200 bg-white px-8 py-6 max-sm:px-5 dark:border-neutral-700 dark:bg-neutral-800"
  >
    <Giscus
      :key="route.path"
      host="https://giscus.ultravires.me"
      repo="ultravires/ultravires.github.io"
      repo-id="R_kgDOHMWLag"
      category="Announcements"
      category-id="DIC_kwDOHMWLas4CevT3"
      mapping="pathname"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="giscusTheme"
      lang="zh-CN"
      loading="lazy"
    />
  </div>
</template>
