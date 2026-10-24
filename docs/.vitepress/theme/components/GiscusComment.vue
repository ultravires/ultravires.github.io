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

// 评论框内部配色分两种来源：
// - 生产：走 giscus 自定义主题（CSS URL，文件在 docs/src/public/，构建后发布到站点根）。
//   统一用当前站点源 www.ultravires.me——该域名经 Cloudflare 注入了 Access-Control-Allow-Origin 且为 HTTPS，
//   满足 giscus iframe 跨域加载自定义主题的要求；旧域名 ultravires.github.io 会 301 跳转且无 CORS 头，导致主题加载失败。
//   仅 SSR 预渲染阶段回退到生产域名（此时主题尚未真正渲染，无实际影响）。
// - 开发：giscus iframe 是 HTTPS，无法加载本机 HTTP 的 CSS（混合内容会被浏览器拦截），
//   退回到官方 noborder 主题（自定义主题即以其为模板），保证暗色切换可预览。
const giscusTheme = computed(() => {
  if (import.meta.env.DEV) {
    return isDark.value ? 'noborder_dark' : 'noborder_light';
  }
  const file = isDark.value ? 'giscus-theme-dark.css' : 'giscus-theme-light.css';
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://www.ultravires.me';
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
