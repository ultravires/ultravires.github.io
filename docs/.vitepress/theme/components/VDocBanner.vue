<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ColorThief from 'colorthief';
import { useData, withBase } from 'vitepress';
import VWave from './VWave.vue';

const { frontmatter } = useData();

const imageRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  const colorThief = new ColorThief();
  if (imageRef.value?.complete) {
    console.log('complete');
    const [r, g, b] = colorThief.getColor(imageRef.value);
    document.documentElement.style.setProperty('--color-primary', `rgb(${r}, ${g}, ${b})`);
  } else {
    imageRef.value?.addEventListener('load', function() {
      console.log('load');
      const [r, g, b] = colorThief.getColor(imageRef.value);
      console.log(r,g,b)
      document.documentElement.style.setProperty('--color-primary', `rgb(${r}, ${g}, ${b})`);
    });
  }
});
</script>

<template>
  <div
    v-show="frontmatter?.banner"
    class="before:content-normal before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-neutral-900/30 relative w-full h-full bg-primary overflow-hidden -z-10 select-none"
    :class="{ 'before:backdrop-blur-lg before:bg-primary before:opacity-90 is-blur': frontmatter?.banner?.blur }"
    draggable="false"
  >
    <img
      v-if="frontmatter?.banner?.image"
      ref="imageRef"
      class="object-cover w-full h-full"
      :src="withBase(frontmatter?.banner?.image ?? '')"
      alt=""
      crossorigin="anonymous"
    />
    <VWave />
  </div>
</template>

<style scoped>
.is-blur > img {
  transform: rotate(30deg);
  opacity: .1;
  filter: blur(10px);
  margin-left: 20%;
}
</style>
