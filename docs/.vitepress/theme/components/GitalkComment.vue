<script lang="ts" setup>
import { sha256 } from 'js-sha256';
import { useRoute } from 'vitepress';
import { onMounted, ref, watch } from 'vue';
import 'gitalk/dist/gitalk.css';

const route = useRoute();
const gitalkRef = ref<HTMLDivElement>();

// Gitalk 用 issue label 定位评论串，label 长度上限为 50 字符
function resolveId(path: string) {
  const decoded = decodeURIComponent(path);
  return decoded.length < 50 ? decoded : sha256(decoded).slice(0, 49);
}

async function renderGitalk() {
  const el = gitalkRef.value;
  if (!el) return;
  const { default: Gitalk } = await import('gitalk');
  el.innerHTML = '';
  new Gitalk({
    clientID: 'Ov23liQX77rlBWKkAj9W',
    clientSecret: import.meta.env.VITE_GITALK_CLIENT_SECRET || '',
    repo: 'ultravires.github.io',
    owner: 'ultravires',
    admin: ['ultravires'],
    id: resolveId(window.location.pathname),
    language: 'zh-CN',
    distractionFreeMode: false
  }).render(el);
}

onMounted(() => {
  renderGitalk();
  // SPA 路由切换后按新页面重新挂载评论串
  watch(() => route.path, renderGitalk);
});
</script>

<template>
  <div ref="gitalkRef"></div>
</template>

<style>
.dark .gt-container .gt-meta {
  border-color: #404040;
}
.dark .gt-container .gt-header-textarea,
.dark .gt-container .gt-header-preview {
  color: #d4d4d4;
  background-color: #171717;
  border-color: #404040;
}
.dark .gt-container .gt-header-textarea:hover,
.dark .gt-container .gt-header-preview:hover {
  background-color: #262626;
}
.dark .gt-container .gt-comment-content {
  background-color: #262626;
}
.dark .gt-container .gt-comment-content:hover {
  box-shadow: 0 0.5em 1em 0 rgba(0, 0, 0, 0.4);
}
.dark .gt-container .gt-comment-body,
.dark .gt-container .gt-comment-admin .gt-comment-body {
  color: #d4d4d4 !important;
}
.dark .gt-container .gt-popup {
  background-color: #262626;
  border-color: #404040;
}
.dark .gt-container .gt-popup .gt-action.is--active:before {
  background: #d4d4d4;
}
</style>
