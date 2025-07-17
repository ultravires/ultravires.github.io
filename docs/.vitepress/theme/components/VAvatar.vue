<script setup>
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <div
    class="dark:bg-neutral-800 w-24 h-24 bg-neutral-50 border border-solid border-line rounded-full shadow-sm overflow-hidden"
  >
    <img class="w-full h-full object-contain" :src="getAvatarUrl(frontmatter?.author?.email)" alt="Author's avatar" />
  </div>
</template>
