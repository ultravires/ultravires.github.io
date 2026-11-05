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

// 每次渲染使用独立 id，避免同页多图与跨页残留的 SVG 元素 id 冲突
let renderSeq = 0;

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
