---
title: 故障艺术字
date: 2026-01-28 00:00:00
---

故障艺术字的效果挺有意思的，可以用来做一些比较酷炫的标题。

---

<script setup lang="ts">
import GlitchArtText from '@theme/components/GlitchArtText.vue';
</script>

<GlitchArtText text="窗前明月光，疑似地上霜。" />

```vue
<script setup lang="ts">
import { ref } from 'vue';

/**
 * GlitchArtText.vue
 * A component that renders text with an electromagnetic interference (glitch) effect.
 *
 * Usage:
 * <GlitchArtText text="Hello World" />
 */
defineProps<{
  text: string;
}>();

// 随机增加一些瞬间的“剧烈闪烁”效果
const glitchTextRef = ref<HTMLElement | null>(null);

function triggerRandomGlitch() {
  if (!glitchTextRef.value) return;

  if (Math.random() > 0.95) {
    glitchTextRef.value.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.5)`;
    setTimeout(() => {
      if (!glitchTextRef.value) return;
      glitchTextRef.value.style.filter = 'none';
    }, 50);
  }
  requestAnimationFrame(triggerRandomGlitch);
}

if (glitchTextRef.value) {
  triggerRandomGlitch();
}
</script>

<template>
  <div class="glitch-container">
    <div class="glitch-container">
      <h1
        ref="glitchTextRef"
        class="glitch-text"
        :data-text="text"
      >
        {{ text }}
      </h1>
    </div>
  </div>
</template>

<style scoped>
.glitch-container {
  display: inline-block;
  position: relative;
}

/* 扫描线效果叠加层 */
.glitch-container {
  position: relative;
  padding: 20px;
}

.glitch-text {
  position: relative;
  font-size: 2rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--text-color);
  letter-spacing: 5px;
  /* 基础文字阴影，增强立体感 */
  text-shadow:
    0.05em 0 0 rgba(255, 0, 0, 0.75),
    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
    0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

/* 伪元素用于创建重影层 */
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

/* 顶部/层1：蓝色偏移 */
.glitch-text::before {
  animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
  color: var(--glitch-color-1);
  z-index: -1;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  left: 2px;
}

/* 底部/层2：红色偏移 */
.glitch-text::after {
  animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
  color: var(--glitch-color-2);
  z-index: -2;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  left: -2px;
}

/* 关键帧动画：切片抖动 */
@keyframes glitch-anim-1 {
  0% {
    clip-path: inset(40% 0 61% 0);
    transform: translate(-5px, 0);
  }
  20% {
    clip-path: inset(92% 0 1% 0);
    transform: translate(5px, 0);
  }
  40% {
    clip-path: inset(43% 0 1% 0);
    transform: translate(-5px, 0);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
    transform: translate(5px, 0);
  }
  80% {
    clip-path: inset(54% 0 7% 0);
    transform: translate(-5px, 0);
  }
  100% {
    clip-path: inset(58% 0 43% 0);
    transform: translate(5px, 0);
  }
}

@keyframes glitch-anim-2 {
  0% {
    clip-path: inset(10% 0 80% 0);
    transform: translate(5px, 0);
  }
  20% {
    clip-path: inset(30% 0 20% 0);
    transform: translate(-5px, 0);
  }
  40% {
    clip-path: inset(50% 0 40% 0);
    transform: translate(5px, 0);
  }
  60% {
    clip-path: inset(70% 0 10% 0);
    transform: translate(-5px, 0);
  }
  80% {
    clip-path: inset(15% 0 75% 0);
    transform: translate(5px, 0);
  }
  100% {
    clip-path: inset(85% 0 5% 0);
    transform: translate(-5px, 0);
  }
}

/* 关键帧动画：整体倾斜扭曲 */
@keyframes glitch-skew {
  0% {
    transform: skew(0deg);
  }
  10% {
    transform: skew(1deg);
  }
  20% {
    transform: skew(-3deg);
  }
  30% {
    transform: skew(0deg);
  }
  40% {
    transform: skew(2deg);
  }
  50% {
    transform: skew(-1deg);
  }
  100% {
    transform: skew(0deg);
  }
}

/* 响应式调整 */
@media (max-width: 600px) {
  .glitch-text {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
}
</style>
```
