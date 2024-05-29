<script lang="ts" setup>
import { useData } from 'vitepress';
import VHeader from '../components/VHeader.vue';
import NotFound from '../NotFound.vue';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';
import ArchiveLayout from './ArchiveLayout.vue';
import VFooter from '../components/VFooter.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <VHeader />
  <main class="flex flex-col min-h-screen text-base transition-colors duration-100">
    <HomeLayout v-if="frontmatter.layout === 'home'" />
    <ArchiveLayout v-else-if="frontmatter.layout === 'archive'" />
    <NotFound v-else-if="page.isNotFound" />
    <DocLayout v-else />
    <VFooter />
  </main>
</template>
