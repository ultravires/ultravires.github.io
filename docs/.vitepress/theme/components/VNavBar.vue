<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBarLink from './VNavBarLink.vue';
import VIconSearch from './icons/VIconSearch.vue';

const { theme } = useData();
</script>

<template>
  <nav class="VNavBar max-md:hidden absolute  flex justify-center items-center gap-4 w-full h-[var(--web-header-height)] -z-10">
    <template v-for="item in theme.nav" :key="item.text">
      <VNavBarLink class="hover:bg-primary hover:text-reverse group relative text-md tracking-8 decoration-none rounded-full whitespace-nowrap font-medium" :item="item" />
    </template>
    <span class="hover:bg-primary hover:text-reverse rounded-full p-2 cursor-pointer transition-colors duration-300">
      <VIconSearch title="搜索" />
    </span>
  </nav>
</template>