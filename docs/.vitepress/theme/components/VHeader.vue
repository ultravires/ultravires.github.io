<script lang="ts" setup>
import VLogo from './VLogo.vue';
import VNavBar from './VNavBar.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
</script>

<template>
  <header class="container flex items-center mx-auto mb-4 h-16">
    <VLogo />
    <VNavBar class="mx-auto" />
    <div class="flex items-center gap-4 text-xl">
      <div class="hover:bg-primary hover:text-reverse p-1 rounded-full cursor-pointer">
        <VRandomArticle />
      </div>
      <div class="hover:bg-primary hover:text-reverse p-1 rounded-full">
        <VThemeToggle />
      </div>
    </div>
  </header>
</template>