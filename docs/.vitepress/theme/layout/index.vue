<script lang="ts" setup>
import { useData } from 'vitepress';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';
import VFooter from '../components/VFooter.vue';

const { frontmatter } = useData();
</script>

<template>
  <div class="dark:bg-neutral-950 flex flex-col min-h-screen bg-neutral-50 text-base">
    <HomeLayout v-if="frontmatter.layout === 'home'" />
    <DocLayout v-else />
    <VFooter />
  </div>
</template>
