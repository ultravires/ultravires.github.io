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
    <VNavBarHamburger class="max-md:flex hidden ml-auto" />
    <div class="max-md:hidden flex items-center gap-4 text-xl">
      <div class="hover:bg-primary hover:text-reverse p-1 rounded-full">
        <VRandomArticle />
      </div>
      <div class="hover:bg-primary hover:text-reverse p-1 rounded-full">
        <VThemeToggle />
      </div>
    </div>
  </header>
</template>