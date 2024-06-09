<script lang="ts" setup>
import { useData } from 'vitepress';
import VLogo from './VLogo.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VBackTop from './VBackToTop.vue';
import VNavBarLink from './VNavBarLink.vue';
import VIconSearch from './icons/VIconSearch.vue';

const { theme } = useData();
</script>

<template>
  <nav class="
    @container
    dark:bg-neutral-900
    dark:bg-opacity-90
    dark:border-neutral-700
    VNavBar
    fixed
    w-full
    h-[var(--web-header-height)]
    bg-white
    bg-opacity-90
    border-b
    border-solid
    border-neutral-200
    backdrop-blur-sm
    text-base
    top-0
    z-10
  ">
    <div class="@8xl:max-w-[87.5rem] md:px-6 max-md:container relative flex justify-center items-center gap-4 mx-auto h-full z-0">
      <VLogo />
      <ul class="max-md:hidden absolute flex gap-4 justify-center items-center mx-auto w-full h-full -z-10">
        <li v-for="item in theme.nav" :key="item.text">
          <VNavBarLink class="hover:bg-primary hover:text-reverse group relative text-md tracking-8 decoration-none rounded-full whitespace-nowrap font-medium" :item="item" />
        </li>
        <li class="hover:bg-primary hover:text-reverse rounded-full p-2 cursor-pointer transition-colors duration-300">
          <VIconSearch title="搜索" />
        </li>
      </ul>
      <div class="max-md:ml-auto flex items-center gap-4 ml-auto">
        <VRandomArticle />
        <VThemeToggle />
        <VBackTop />
        <VNavBarHamburger class="max-md:flex hidden ml-4" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.VNavBar {
  --web-main-header-bg: rgb(255 255 255 / var(--tw-bg-opacity));
  animation: background-transform auto linear;
  animation-timeline: --page-scroll;
}

.dark .VNavBar {
  --web-main-header-bg: rgb(23 23 23 / var(--tw-bg-opacity));
  --web-main-header-border: 1px solid #262626;
}

@keyframes background-transform {
  0% {
    background-color: transparent;
    border-bottom-width: 0;
    backdrop-filter: blur(0px);
  }
  .0001% {
    background-color: var(--web-main-header-bg);
    border-bottom-width: 1px;
    backdrop-filter: blur(10px);
  }
  100% {
    background-color: var(--web-main-header-bg);
    border-bottom-width: 1px;
    backdrop-filter: blur(10px);
  }
}
</style>