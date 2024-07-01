<script lang="ts" setup>
import { useData } from 'vitepress';
import VWave from './VWave.vue';

const { frontmatter } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.banner"
    class="before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-neutral-900 before:bg-opacity-30 relative h-96 bg-neutral-200 overflow-hidden -z-10 select-none"
    :class="{ 'before:backdrop-blur-lg': frontmatter?.banner?.blur }"
    draggable="false"
  >
    <img
      v-show="frontmatter?.banner?.image"
      class="object-cover w-full h-full"
      :src="frontmatter?.banner?.image"
    />
    <VWave />
  </div>
</template>
