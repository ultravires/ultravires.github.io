<script lang="ts" setup>
import VLogo from './VLogo.vue';
import VNavBar from './VNavBar.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
</script>

<template>
  <header class="max-md:px-4 container flex items-center mx-auto mb-4 h-16">
    <VLogo />
    <VNavBar class="max-md:hidden mx-auto" />
    <div class="max-md:ml-auto flex items-center gap-4 text-xl">
      <VRandomArticle />
      <VThemeToggle />
    </div>
    <VNavBarHamburger class="max-md:flex hidden ml-8" />
  </header>
</template>