<script lang="ts" setup>
import { useData } from 'vitepress';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';

const { frontmatter } = useData();
</script>

<template>
  <ClientOnly>
    <section class="dark:bg-neutral-950 dark:text-white min-h-screen bg-neutral-50 text-black">
      <HomeLayout v-if="frontmatter.layout === 'home'" />
      <DocLayout v-else />
    </section>
  </ClientOnly>
</template>