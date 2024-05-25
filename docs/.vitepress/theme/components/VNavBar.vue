<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBarLink from './VNavBarLink.vue';
import VIconSearch from './icons/VIconSearch.vue';

const { theme } = useData();
</script>

<template>
  <nav class="VNavBar max-md:hidden absolute  flex justify-center items-center gap-4 w-full h-16 -z-10">
    <template v-for="item in theme.nav" :key="item.text">
      <VNavBarLink class="hover:bg-primary hover:text-reverse group relative px-4 py-2 text-md tracking-8 decoration-none rounded-full whitespace-nowrap font-medium" :item="item" />
    </template>
    <span class="hover:bg-primary hover:text-reverse rounded-full p-2 cursor-pointer">
      <VIconSearch title="搜索" />
    </span>
  </nav>
</template>