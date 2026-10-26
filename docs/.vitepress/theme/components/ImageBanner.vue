<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useData } from 'vitepress';
import { resolveBannerImage } from '../support/banner';
import VWave from './VWave.vue';

const { frontmatter, page } = useData();

const src = computed(() => {
  const banner = frontmatter.value?.banner ?? {};
  const key = page.value?.relativePath || frontmatter.value?.title || 'post';
  return resolveBannerImage(banner, key);
});

const blur = computed(() => Boolean(frontmatter.value?.banner?.blur));

// 切换文章时交叉淡入淡出：base 层始终展示当前图，incoming 层加载完成后淡入覆盖，
// 过渡结束后再并入 base 层。时长需与下方 CSS transition 保持一致。
const FADE_DURATION = 600;
const baseSrc = ref(src.value);
const incomingSrc = ref('');
const incomingVisible = ref(false);
let fadeTimer = null;

watch(src, (next) => {
  if (!next || next === baseSrc.value || next === incomingSrc.value) return;
  incomingVisible.value = false;
  incomingSrc.value = next;
});

function onIncomingLoad() {
  incomingVisible.value = true;
  clearTimeout(fadeTimer);
  // 兜底：transitionend 未触发时（如系统开启减弱动效）也按时并入
  fadeTimer = setTimeout(commitIncoming, FADE_DURATION + 100);
}

function onIncomingTransitionEnd(event) {
  if (event.propertyName === 'opacity') commitIncoming();
}

function commitIncoming() {
  if (!incomingSrc.value || !incomingVisible.value) return;
  clearTimeout(fadeTimer);
  baseSrc.value = incomingSrc.value;
  incomingSrc.value = '';
  incomingVisible.value = false;
}

onBeforeUnmount(() => clearTimeout(fadeTimer));
</script>

<template>
  <div class="image-banner">
    <img
      class="banner-img"
      :class="{ 'is-blur': blur }"
      :src="baseSrc"
      alt=""
      loading="eager"
    />
    <!-- 新图加载完成后淡入覆盖，避免切换文章时背景生硬替换 -->
    <img
      v-if="incomingSrc"
      class="banner-img banner-img-incoming"
      :class="{ 'is-blur': blur, 'is-visible': incomingVisible }"
      :src="incomingSrc"
      alt=""
      loading="eager"
      @load="onIncomingLoad"
      @transitionend="onIncomingTransitionEnd"
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

.banner-img-incoming {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.banner-img-incoming.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .banner-img-incoming {
    transition: none;
  }
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
