<script lang="ts" setup>
import { useData } from 'vitepress';
import VIconHome from './icons/VIconHome.vue';

const { site, theme } = useData();
const siteData = site.value;
const themeData = theme.value;
</script>

<template>
  <div class="group/logo relative px-4 py-2 whitespace-nowrap">
    <a
      class="group-hover/logo:invisible decoration-none font-medium text-md text-lg"
      href="/"
    >
      {{ themeData.siteTitle || siteData.title }}
    </a>
    <a
      class="group-hover/logo:visible group-hover/logo:bg-primary invisible absolute flex items-center justify-center w-full h-full text-reverse rounded-full top-0 left-0 transition-colors duration-300"
      href="/"
    >
      <VIconHome class="text-lg" title="返回首页" />
    </a>
  </div>
</template>
