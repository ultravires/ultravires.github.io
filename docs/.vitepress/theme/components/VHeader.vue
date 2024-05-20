<script lang="ts" setup>
import VLogo from './VLogo.vue';
import VNavBar from './VNavBar.vue';
import VThemeToggle from './VThemeToggle.vue';
</script>

<template>
  <header class="container flex items-center mx-auto mb-4 h-16">
    <VLogo />
    <VNavBar class="mx-auto" />
    <VThemeToggle />
  </header>
</template>