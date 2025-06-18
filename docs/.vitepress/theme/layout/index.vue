<script lang="ts" setup>
import { useData } from 'vitepress';
import VHeader from '../components/VHeader.vue';
import NotFound from '../NotFound.vue';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';
import PageLayout from './PageLayout.vue';
import VFooter from '../components/VFooter.vue';
import VPageProgress from '@theme/components/VPageProgress.vue';
import VBackground from '@theme/components/VBackground.vue';
import ColumnLayout from './ColumnLayout.vue';
import AboutLayout from './AboutLayout.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <VBackground />
  <VPageProgress />
  <section v-if="frontmatter.layout !== false" class="flex flex-col text-normal">
    <VHeader />

    <section class="flex gap-4 w-full">
      <div
        class="@container flex-grow min-h-screen w-full transition-all duration-100"
      >
        <HomeLayout v-if="frontmatter.layout === 'home'" />
        <PageLayout v-else-if="frontmatter.layout === 'page'" />
        <ColumnLayout v-else-if="frontmatter.layout === 'column'" />
        <AboutLayout v-else-if="frontmatter.layout === 'about'" />
        <NotFound v-else-if="page.isNotFound" />
        <DocLayout v-else />
      </div>
    </section>

    <VFooter />
  </section>

  <Content v-else />
</template>
