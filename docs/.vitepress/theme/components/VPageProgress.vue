<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const progressRef = ref<HTMLElement | null>();
const progress = ref<number>(0);

const updateProgress = () => {
  const animation = progressRef.value?.getAnimations()[0];
  if (animation && animation.currentTime) {
    progress.value = animation.currentTime.value;
    console.log(progress.value);
  }
  requestAnimationFrame(updateProgress);
};

onMounted(() => {
  updateProgress();
});
</script>

<template>
  <div class="VPageProgress fixed bg-blue-500 h-1 top-0 left-0 z-100"></div>
</template>

<style scoped>
.VPageProgress {
  animation-name: page-scroll-animation;
  animation-duration: 1ms;
  animation-timing-function: linear;
  animation-timeline: --page-scroll-timeline;
}
</style>