<script lang="ts" setup>
import { useData } from 'vitepress';
import VLogo from './VLogo.vue';
import VNavBar from './VNavBar.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VBackTop from './VBackToTop.vue';

const { frontmatter } = useData();
console.log(frontmatter)
</script>

<template>
  <header class="max-md:px-4 VHeader sticky top-0 mb-4 w-full h-[var(--web-header-height)] z-10">
    <div class="absolute flex justify-center items-center top-0 right-0 bottom-0 left-0 overflow-hidden">
      <h1 class="h-full text-ellipsis whitespace-nowrap overflow-hidden translate-y-full">{{ frontmatter.title }}</h1>
    </div>
    <div class="container relative flex items-center h-full mx-auto z-0">
      <VLogo />
      <VNavBar />
      <div class="max-md:ml-auto flex items-center gap-4 ml-auto">
        <VRandomArticle />
        <VThemeToggle />
        <VBackTop />
      </div>
      <VNavBarHamburger class="max-md:flex hidden ml-8" />
    </div>
  </header>
</template>

<style scoped>
.VHeader {
  --web-main-header-bg: #fff;
  --web-main-header-border: 1px solid #e5e5e5;
  animation: background-transform auto linear;
  animation-timeline: --page-scroll;
}

.dark .VHeader {
  --web-main-header-bg: #171717;
  --web-main-header-border: 1px solid #262626;
}

@keyframes background-transform {
  0% {
    background-color: transparent;
    border: var(--web-main-header-border);
    border-width: 0;
  }
  .0001% {
    background-color: var(--web-main-header-bg);
    border-bottom: var(--web-main-header-border);
  }
  100% {
    background-color: var(--web-main-header-bg);
    border-bottom: var(--web-main-header-border);
  }
}
</style>