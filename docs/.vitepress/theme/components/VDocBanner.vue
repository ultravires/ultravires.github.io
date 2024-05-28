<script lang="ts" setup>
import { useData } from 'vitepress';
import VWave from './VWave.vue';

const { frontmatter } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.banner"
    class="
      before:content-['']
      before:absolute
      before:top-0
      before:right-0
      before:bottom-0
      before:left-0
      before:bg-neutral-700
      before:bg-opacity-30
      relative
      h-72
      -z-10
    "
    :class="{ 'before:backdrop-blur-md': frontmatter?.banner?.blur }"
    >
    <img class="object-cover w-full h-full" :src="frontmatter?.banner?.image" />
    <VWave />
  </div>
</template>