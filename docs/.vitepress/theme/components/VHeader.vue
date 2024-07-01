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
      class="@8xl:max-w-[87.5rem] md:px-10 absolute top-[var(--web-header-height)] left-0 right-0 flex flex-col justify-center items-center mx-auto w-full h-[calc(100%-60px-var(--web-header-height))]"
    >
      <div class="w-full">
        <span v-for="item in frontmatter?.tags" :item="item" class="text-lg">
          <span class="text-white text-opacity-50">#</span>
          <span class="text-white text-opacity-90">{{ item }}</span>
        </span>
      </div>
      <h1
        class="my-2 w-full text-white text-3xl font-bold text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {{ frontmatter?.title }}
      </h1>
    </div>
    <VDocBanner />
  </header>
</template>
