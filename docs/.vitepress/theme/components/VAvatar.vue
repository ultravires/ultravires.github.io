<script setup>
import { withBase, useData } from 'vitepress'

const { theme } = useData();
</script>

<template>
  <div class="dark:bg-neutral-800 dark:border-neutral-600 w-24 h-24 bg-neutral-50 border border-solid border-neutral-200 rounded-full shadow-sm">
    <img class="w-full h-full object-contain" :src="withBase(theme.avatar)" />
  </div>
</template>