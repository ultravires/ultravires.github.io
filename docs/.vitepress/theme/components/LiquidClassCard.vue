<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  // 模糊强度
  blur: { type: Number, default: 30 },
  // 饱和度 (iOS 风格建议 150% - 250%)
  saturation: { type: Number, default: 200 },
  // 亮度
  brightness: { type: Number, default: 0.9 },
  // 是否显示噪点纹理
  showGrain: { type: Boolean, default: true },
  // 玻璃底色倾向：auto 跟随站点明暗主题；dark 强制深色玻璃（用于横幅上的白色前景）
  tone: { type: String, default: 'auto' }
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
    :class="`tone-${tone}`"
    :style="glassStyles"
    @mouseleave="resetPosition"
  >
    <!-- 噪点纹理层 -->
    <div
      v-if="showGrain"
      class="glass-grain"
    ></div>

    <!-- 内容区 -->
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.glass-container {
  position: relative;

  /* 玻璃底色与描边：浅色主题下用半透明白，保证深色前景不被页面背景干扰 */
  --glass-fill: rgba(255, 255, 255, 0.55);
  --glass-border: rgba(0, 0, 0, 0.08);

  background:
    radial-gradient(
      circle at 20% 0%,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.06) 50%,
      rgba(255, 255, 255, 0.02) 100%
    ),
    var(--glass-fill);

  /* 极其细腻的边框 */
  border: 0.5px solid var(--glass-border);

  /* 分层阴影 */
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);

  transition:
    transform 0.1s ease-out,
    box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

/* 暗色主题：换成半透明黑底，避免白色前景融进玻璃 */
[data-theme='dark'] .glass-container {
  --glass-fill: rgba(23, 23, 23, 0.6);
  --glass-border: rgba(255, 255, 255, 0.12);
}

/* 深色玻璃：用于横幅等亮色/复杂背景上的白色前景 */
.glass-container.tone-dark {
  --glass-fill: rgba(0, 0, 0, 0.35);
  --glass-border: rgba(255, 255, 255, 0.18);
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
