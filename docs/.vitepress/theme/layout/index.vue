<script lang="ts" setup>
import { useData } from 'vitepress';
import VHeader from '../components/VHeader.vue';
import NotFound from '../NotFound.vue';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';
import ArchiveLayout from './ArchiveLayout.vue';
import VFooter from '../components/VFooter.vue';

const { frontmatter, page, theme } = useData();
</script>

<template>
  <section class="flex flex-col text-base">
    <VHeader />
    <section class="flex gap-4 w-full">
      <div class="flex-grow min-h-screen w-full transition-colors duration-100">
        <HomeLayout v-if="frontmatter.layout === 'home'" />
        <ArchiveLayout v-else-if="frontmatter.layout === 'archive'" />
        <NotFound v-else-if="page.isNotFound" />
        <DocLayout v-else />
      </div>
    </section>
    <VFooter />
  </section>
</template>
