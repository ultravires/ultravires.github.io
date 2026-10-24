<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { hashString } from '../support/banner';
import VWave from './VWave.vue';

const { frontmatter, page } = useData();

// 文艺渐变配色：均为低饱和安全色，保证白色标题可读
const THEMES = {
  royal: ['#141e30', '#243b55'], // 黛蓝
  mauve: ['#42275a', '#734b6d'], // 暮紫
  forest: ['#134e5e', '#2d6a5f'], // 松绿
  lawrencium: ['#0f0c29', '#302b63'], // 星夜
  aubergine: ['#61045f', '#aa076b'], // 绛紫
  skies: ['#283e51', '#4b79a1'] // 远天
};

const themeNames = Object.keys(THEMES);

const colors = computed(() => {
  const banner = frontmatter.value?.banner ?? {};
  if (banner.theme && THEMES[banner.theme]) return THEMES[banner.theme];
  const key = page.value?.relativePath || frontmatter.value?.title || 'post';
  return THEMES[themeNames[hashString(key) % themeNames.length]];
});

const background = computed(
  () => `linear-gradient(115deg, ${colors.value[0]} 0%, ${colors.value[1]} 100%)`
);
</script>

<template>
  <div
    class="gradient-banner"
    :style="{ background }"
  >
    <!-- 右侧线条修饰：移动端隐藏，避免与居中标题重叠 -->
    <svg
      class="decor max-md:hidden"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="#ffffff"
        stroke-width="1"
      >
        <circle
          cx="330"
          cy="140"
          r="170"
          opacity="0.08"
        />
        <circle
          cx="330"
          cy="140"
          r="125"
          opacity="0.12"
        />
        <circle
          cx="330"
          cy="140"
          r="80"
          opacity="0.16"
        />
        <circle
          cx="330"
          cy="140"
          r="40"
          opacity="0.2"
        />
        <line
          x1="180"
          y1="360"
          x2="400"
          y2="140"
          opacity="0.18"
        />
        <line
          x1="210"
          y1="390"
          x2="430"
          y2="170"
          opacity="0.12"
        />
        <line
          x1="150"
          y1="330"
          x2="370"
          y2="110"
          opacity="0.12"
        />
        <line
          x1="40"
          y1="60"
          x2="200"
          y2="60"
          opacity="0.14"
          stroke-dasharray="1 6"
        />
        <line
          x1="60"
          y1="80"
          x2="180"
          y2="80"
          opacity="0.1"
          stroke-dasharray="1 6"
        />
      </g>
    </svg>
    <div class="banner-content">
      <slot></slot>
    </div>
    <VWave />
  </div>
</template>

<style scoped>
.gradient-banner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.decor {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  pointer-events: none;
  mask-image: linear-gradient(to left, black 55%, transparent 100%);
  -webkit-mask-image: linear-gradient(to left, black 55%, transparent 100%);
}

.banner-content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
