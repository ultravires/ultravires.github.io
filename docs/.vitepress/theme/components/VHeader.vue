<script lang="ts" setup>
import VLogo from './VLogo.vue';
import VNavBar from './VNavBar.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VBackTop from './VBackToTop.vue';
</script>

<template>
  <header class="max-md:px-4 VHeader sticky top-0 mb-4 h-16 z-10">
    <div class="container flex items-center h-full mx-auto">
      <VLogo />
      <VNavBar class="max-md:hidden mx-auto" />
      <div class="max-md:ml-auto flex items-center gap-4 text-xl">
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
  .1% {
    background-color: var(--web-main-header-bg);
    border-bottom: var(--web-main-header-border);
  }
  100% {
    background-color: var(--web-main-header-bg);
    border-bottom: var(--web-main-header-border);
  }
}
</style>