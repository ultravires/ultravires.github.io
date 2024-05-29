<script lang="ts" setup>
import { useData } from 'vitepress';
import VAvatar from './VAvatar.vue';
import VSponsor from './VSponsor.vue';
import VCopyright from './VCopyright.vue';

const { frontmatter } = useData();
</script>

<template>
  <div v-show="frontmatter?.footer !== false" class="dark:bg-neutral-800 dark:border-neutral-600 relative flex flex-col gap-4 justify-center items-center pt-16 pb-8 mt-32 mb-12 bg-neutral-50 border border-solid border-neutral-200 rounded-xl">
    <VAvatar class="absolute top-0 -translate-y-1/2" />
    <div class="text-center">
      <p class="text-xl">向成渝</p>
      <p class="text-sm text-neutral-400 mt-2">专注计算机科学与技术</p>
    </div>
    <VSponsor />
    <VCopyright />
  </div>
</template>