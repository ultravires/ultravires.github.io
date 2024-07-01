<script setup>
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <svg v-show="frontmatter?.banner?.wave" class="waves-svg max-md:hidden" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
    <defs>
      <path id="gentle-wave" d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"></path>
    </defs>
    <g class="parallax">
      <use href="#gentle-wave" x="48" y="0"></use>
      <use href="#gentle-wave" x="48" y="3"></use>
      <use href="#gentle-wave" x="48" y="5"></use>
      <use href="#gentle-wave" x="48" y="7"></use>
    </g>
  </svg>
</template>

<style scoped>
.waves-svg {
  --wave-background: #fafafa;
  position: absolute;
  bottom: -10px;
  width: 100%;
  height: 60px;
}

.dark .waves-svg {
  --wave-background: #0a0a0a;
}

.parallax>use {
  animation: move-forever 30s cubic-bezier(.55,.5,.45,.5) infinite;
}

.parallax>use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
  fill: var(--wave-background);
  opacity: .5;
}

.parallax>use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
  fill: var(--wave-background);
  opacity: .6;
}

.parallax>use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
  fill: var(--wave-background);
  opacity: .7;
}

.parallax>use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
  fill: var(--wave-background);
}

@keyframes move-forever {
  from {
    transform: translate3d(-90px,0,0);
  }
  to {
    transform: translate3d(85px,0,0);
  }
}
</style>