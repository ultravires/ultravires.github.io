<script lang="ts" setup>
import { useData } from 'vitepress';
import HomeLayout from './HomeLayout.vue';
import DocLayout from './DocLayout.vue';
import { isSSR } from '../support/utils';

const { frontmatter } = useData();
</script>

<template>
  <ClientOnly v-if="isSSR()">
    <section class="dark:bg-neutral-950 dark:text-white min-h-screen bg-neutral-50 text-black">
      <HomeLayout v-if="frontmatter.layout === 'home'" />
      <DocLayout v-else />
    </section>
  </ClientOnly>
  <template v-else>
    <section class="dark:bg-neutral-950 dark:text-white min-h-screen bg-neutral-50 text-black">
      <HomeLayout v-if="frontmatter.layout === 'home'" />
      <DocLayout v-else />
    </section>
  </template>
</template>