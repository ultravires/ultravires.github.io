<script lang="ts" setup>
import Giscus from '@giscus/vue';
import { useRoute } from 'vitepress';
import { onMounted, onUnmounted, ref } from 'vue';

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
</script>

<template>
  <!-- SPA 路由切换后按新页面重新挂载评论串 -->
  <Giscus
    :key="route.path"
    repo="ultravires/ultravires.github.io"
    repo-id="R_kgDOHMWLag"
    category="Announcements"
    category-id="DIC_kwDOHMWLas4CevT3"
    mapping="pathname"
    strict="1"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    :theme="isDark ? 'noborder_dark' : 'noborder_light'"
    lang="zh-CN"
    loading="lazy"
  />
</template>
