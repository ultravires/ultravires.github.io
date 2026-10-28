<script lang="ts" setup>
import { useData } from 'vitepress';
import VAvatar from './VAvatar.vue';
import VCopyright from './VCopyright.vue';
import VSponsor from './VSponsor.vue';

const { frontmatter } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.footer !== false"
    class="border-line relative mb-12 mt-32 flex flex-col items-center gap-5 rounded-2xl border border-solid bg-neutral-50 px-6 pb-10 pt-24 max-md:hidden dark:bg-neutral-900"
  >
    <VAvatar
      class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
      :size="160"
    />

    <div class="flex flex-col items-center gap-1.5 text-center">
      <p class="text-2xl font-semibold tracking-wide">
        {{ frontmatter?.author?.name }}
      </p>
      <p class="text-normal/60 text-sm">专注计算机科学与技术</p>
    </div>

    <div
      class="bg-primary/40 h-px w-10"
      aria-hidden="true"
    />

    <VSponsor />

    <VCopyright />
  </div>
</template>
