<script lang="ts">
// 模块级计数器：同一页面的多个图共享，保证每次 render 的 DOM id 唯一。
// 若放进 <script setup>，它会变成每个组件实例私有的计数，同页多图都从
// mermaid-1 开始；mermaid 依赖该 id 查找临时容器，并发渲染时会相互覆盖。
let renderSeq = 0;
</script>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useData } from 'vitepress';

const props = defineProps<{
  /** mermaid 源码，经 encodeURIComponent 编码后传入 */
  graph: string;
}>();

const { frontmatter } = useData();

const svg = ref('');

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void;
  render: (id: string, text: string) => Promise<{ svg: string }>;
};

let mermaid: MermaidApi | null = null;
let observer: MutationObserver | undefined;

function currentTheme(): string {
  const explicit = frontmatter.value.mermaidTheme;
  if (explicit) return explicit;
  // 站点暗色模式挂在 <html data-theme> 上（见 useTheme.ts）
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'default';
}

async function renderChart() {
  if (!mermaid) return;

  try {
    mermaid.initialize({
      securityLevel: 'loose',
      startOnLoad: false,
      theme: currentTheme()
    });
    const result = await mermaid.render(
      `mermaid-${++renderSeq}`,
      decodeURIComponent(props.graph)
    );
    svg.value = result.svg;
  } catch (error) {
    console.error('[mermaid] 渲染失败:', error);
  }
}

onMounted(async () => {
  const mod = await import('mermaid');
  mermaid = mod.default as unknown as MermaidApi;

  observer = new MutationObserver(() => renderChart());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  await renderChart();
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <div v-html="svg" />
</template>
