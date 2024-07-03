<script lang="ts" setup>
import VNavBar from './VNavBar.vue';
import VDocBanner from './VDocBanner.vue';
import VPostInfo from './VPostInfo.vue';
</script>

<template>
  <header
    class="VHeader relative min-h-[var(--web-header-height)] mb-4 top-0 z-10"
  >
    <VNavBar />
    <VPostInfo />
    <VDocBanner />
  </header>
</template>
