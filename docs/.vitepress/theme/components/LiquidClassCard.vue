<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  // 模糊强度
  blur: { type: Number, default: 40 },
  // 饱和度 (iOS 风格建议 150% - 250%)
  saturation: { type: Number, default: 210 },
  // 亮度
  brightness: { type: Number, default: 1.1 },
  // 是否显示噪点纹理
  showGrain: { type: Boolean, default: true }
});

const rotateX = ref(0);
const rotateY = ref(0);

const resetPosition = () => {
  rotateX.value = 0;
  rotateY.value = 0;
};

const glassStyles = computed(() => ({
  backdropFilter: `blur(${props.blur}px) saturate(${props.saturation}%) brightness(${props.brightness})`,
  webkitBackdropFilter: `blur(${props.blur}px) saturate(${props.saturation}%) brightness(${props.brightness})`,
  transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`
}));
</script>

<template>
  <div
    ref="cardRef"
    class="glass-container"
    :style="glassStyles"
    @mouseleave="resetPosition"
  >
    <!-- 噪点纹理层 -->
    <div
      v-if="showGrain"
      class="glass-grain"
    ></div>

    <!-- 顶部边缘高光 -->
    <div class="edge-highlight"></div>

    <!-- 内容区 -->
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.glass-container {
  position: relative;
  background: radial-gradient(
    circle at 20% 0%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.01) 100%
  );

  /* 极其细腻的边框 */
  border: 0.5px solid rgba(255, 255, 255, 0.18);

  /* 分层阴影 */
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);

  transition:
    transform 0.1s ease-out,
    box-shadow 0.3s ease;
  transform-style: preserve-3d;
  overflow: hidden;
}

/* 噪点纹理渲染 */
.glass-grain {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  z-index: 1;
}

.edge-highlight {
  position: absolute;
  top: 0;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  z-index: 2;
}

.content-wrapper {
  transform: translateZ(15px);
  z-index: 3;
}

/* 针对标题应用 Vibrancy 模拟 */
:deep(h2),
:deep(.title) {
  mix-blend-mode: plus-lighter;
  text-shadow: 0 1px 10px rgba(255, 255, 255, 0.1);
  letter-spacing: -0.02em;
}
</style>
