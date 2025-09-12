<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBar from './VNavBar.vue';
import VDocBanner from './VDocBanner.vue';
import VPostInfo from './VPostInfo.vue';

const { frontmatter } = useData();
</script>

<template>
  <header class="VHeader relative top-0 z-10 mb-4" :class="frontmatter?.layout !== 'home' && frontmatter?.banner ? 'h-96' : 'h-16'">
    <!-- 导航栏 -->
    <VNavBar />

    <!-- 文章横幅 -->
    <div class="absolute top-0 left-0 -z-10 flex h-full w-full flex-col items-center justify-center">
      <!-- 横幅中文章信息 -->
      <VPostInfo />
      <!-- 横幅背景 -->
      <VDocBanner />
    </div>
  </header>
</template>
