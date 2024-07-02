<script lang="ts" setup>
import { useData } from 'vitepress';
import VHeader from '../components/VHeader.vue';
import NotFound from '../NotFound.vue';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';
import VFooter from '../components/VFooter.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <section class="flex flex-col text-base">
    <VHeader />
    <section class="flex gap-4 w-full">
      <div
        class="@container flex-grow min-h-screen w-full transition-colors duration-100"
      >
        <HomeLayout v-if="frontmatter.layout === 'home'" />
        <NotFound v-else-if="page.isNotFound" />
        <DocLayout v-else />
      </div>
    </section>
    <VFooter />
  </section>
</template>
