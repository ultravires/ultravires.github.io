<script lang="ts" setup>
import { useData } from 'vitepress';
import VNavBar from './VNavBar.vue';
import VDocBanner from './VDocBanner.vue';

const { frontmatter } = useData();
</script>

<template>
  <header
    class="VHeader relative min-h-[var(--web-header-height)] mb-4 top-0 z-10"
  >
    <VNavBar />

    <div
      v-show="frontmatter?.banner ?? frontmatter?.title"
      class="@container absolute w-full h-full top-[var(--web-header-height)] left-0 right-0"
    >
      <div
        class="@8xl:max-w-[87.5rem] max-md:items-center max-md:px-4 px-10 flex flex-col justify-center items-start mx-auto w-full h-[calc(100%-60px-var(--web-header-height))]"
      >
        <div class="flex gap-2">
          <span v-for="item in frontmatter?.tags" :item="item">
            <span class="text-white text-opacity-50"># </span>
            <span class="text-white text-opacity-80 text-xl">{{ item }}</span>
          </span>
        </div>
        <h1
          class="my-2 text-white text-3xl font-bold text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {{ frontmatter?.title }}
        </h1>
      </div>
    </div>
    <VDocBanner />
  </header>
</template>
