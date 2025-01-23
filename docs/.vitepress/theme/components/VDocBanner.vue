<script lang="ts" setup>
import { useData, withBase } from 'vitepress';
import { getImageColor } from '@theme/support/utils';
import VWave from './VWave.vue';

const { frontmatter } = useData();

function handleImageLoaded(event: Event) {
  // const color = getImageColor(event.currentTarget);
  // document.documentElement.style.setProperty(
  //   '--web-color-primary',
  //   color.join(' ')
  // );
  // console.log(color.join(' '));
}
</script>

<template>
  <div
    v-show="frontmatter?.banner"
    class="before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-neutral-900/30 relative h-[30rem] bg-neutral-200 overflow-hidden -z-10 select-none"
    :class="{ 'before:backdrop-blur-lg': frontmatter?.banner?.blur }"
    draggable="false"
  >
    <img
      v-show="frontmatter?.banner?.image"
      class="object-cover w-full h-full"
      :src="withBase(frontmatter?.banner?.image ?? '')"
      alt=""
      @load="handleImageLoaded"
    />
    <VWave />
  </div>
</template>
