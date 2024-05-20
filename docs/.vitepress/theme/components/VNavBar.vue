<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBarLink from './VNavBarLink.vue';

const { theme } = useData();
</script>

<template>
  <nav class="flex items-center gap-4">
    <template v-for="item in theme.nav" :key="item.text">
      <VNavBarLink :item="item" />
    </template>
  </nav>
</template>