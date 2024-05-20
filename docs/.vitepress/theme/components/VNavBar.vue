<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBarLink from './VNavBarLink.vue';
import VIconSearch from './icons/VIconSearch.vue';

const { theme } = useData();
</script>

<template>
  <nav class="flex items-center gap-4">
    <template v-for="item in theme.nav" :key="item.text">
      <VNavBarLink :item="item" />
    </template>
    <span class="hover:bg-primary hover:text-reverse rounded-full p-2 cursor-pointer">
      <VIconSearch title="搜索" />
    </span>
  </nav>
</template>