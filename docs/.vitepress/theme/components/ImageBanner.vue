<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import { hashString } from '../support/banner';
import VWave from './VWave.vue';

const { frontmatter, page } = useData();

// 自定义图片优先，否则按文章路径生成 picsum 稳定随机图
const src = computed(() => {
  const banner = frontmatter.value?.banner ?? {};
  if (typeof banner.image === 'string' && banner.image) return banner.image;
  const key = page.value?.relativePath || frontmatter.value?.title || 'post';
  return `https://picsum.photos/seed/${hashString(key)}/1920/640`;
});

const blur = computed(() => Boolean(frontmatter.value?.banner?.blur));
</script>

<template>
  <div class="image-banner">
    <img
      class="banner-img"
      :class="{ 'is-blur': blur }"
      :src="src"
      alt=""
      loading="eager"
    />
    <!-- 左深右浅的压暗遮罩，保证标题文字清晰 -->
    <div class="banner-overlay"></div>
    <div class="banner-content">
      <slot></slot>
    </div>
    <VWave />
  </div>
</template>

<style scoped>
.image-banner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #1a1a2e;
}

.banner-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-img.is-blur {
  filter: blur(6px);
  transform: scale(1.05);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    rgba(0, 0, 0, 0.62) 0%,
    rgba(0, 0, 0, 0.38) 45%,
    rgba(0, 0, 0, 0.18) 100%
  );
}

@media (max-width: 768px) {
  .banner-overlay {
    background: rgba(0, 0, 0, 0.45);
  }
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
