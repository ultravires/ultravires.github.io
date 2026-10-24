<script lang="ts" setup>
import { useData } from 'vitepress';
import VAvatar from './VAvatar.vue';
import VSponsor from './VSponsor.vue';
import VCopyright from './VCopyright.vue';

const { frontmatter } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.footer !== false"
    class="relative mt-32 mb-12 flex flex-col items-center gap-5 rounded-2xl border border-solid border-line bg-neutral-50 px-6 pt-24 pb-10 dark:bg-neutral-800"
  >
    <VAvatar
      class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
      :size="160"
    />

    <div class="flex flex-col items-center gap-1.5 text-center">
      <p class="text-2xl font-semibold tracking-wide">
        {{ frontmatter?.author?.name }}
      </p>
      <p class="text-sm text-normal/60">专注计算机科学与技术</p>
    </div>

    <div
      class="h-px w-10 bg-primary/40"
      aria-hidden="true"
    />

    <VSponsor />

    <VCopyright />
  </div>
</template>
