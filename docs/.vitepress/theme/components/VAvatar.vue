<script setup>
import { withBase, useData } from 'vitepress';

const { theme } = useData();
</script>

<template>
  <div
    class="dark:bg-neutral-800 w-24 h-24 bg-neutral-50 border border-solid border-line rounded-full shadow-sm"
  >
    <img class="w-full h-full object-contain" :src="withBase(theme.avatar)" />
  </div>
</template>
