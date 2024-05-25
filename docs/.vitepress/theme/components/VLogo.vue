<script lang="ts" setup>
import { useData } from 'vitepress';
import VIconHome from './icons/VIconHome.vue';

const { site, theme } = useData();
const siteData = site.value;
const themeData = theme.value;
</script>

<template>
  <div class="group relative p-2 whitespace-nowrap">
    <a class="decoration-none font-medium text-lg" href="/">
      {{ themeData.siteTitle || siteData.title }}
    </a>
    <a class="group-[]:hidden group-hover:flex bg-primary text-reverse absolute flex items-center justify-center w-full h-full rounded-full top-0 left-0" href="/">
      <VIconHome class="text-lg" title="返回首页" />
    </a>
  </div>
</template>