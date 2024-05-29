<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBar from './VNavBar.vue';
import VDocBanner from './VDocBanner.vue';

const { frontmatter } = useData();
</script>

<template>
  <header class="
    VHeader
    min-h-[var(--web-header-height)]
    top-0
    z-10
  ">
    <div v-show="frontmatter.title" class="fixed flex justify-center items-center w-full h-[var(--web-header-height)] top-0 overflow-hidden">
      <h1 class="h-full text-ellipsis whitespace-nowrap overflow-hidden translate-y-full">{{ frontmatter.title }}</h1>
    </div>
    <VNavBar />
    <VDocBanner />
  </header>
</template>
