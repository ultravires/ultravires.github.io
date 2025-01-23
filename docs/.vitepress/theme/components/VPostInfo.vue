<script setup>
import { useData } from 'vitepress';
import { formatDate } from '@theme/support/utils';

const { frontmatter } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.banner && frontmatter?.title"
    class="@container absolute w-full h-[calc(100%-60px-var(--web-header-height))] top-[var(--web-header-height)] left-0 right-0"
  >
    <div
      class="@8xl:max-w-[87.5rem] max-md:items-center max-md:px-4 px-10 flex flex-col justify-center items-start gap-2 mx-auto w-full h-full"
    >
      <div class="flex gap-2 items-center">
        <span
          v-for="item in frontmatter?.categories"
          :key="item"
          class="hover:bg-white hover:text-white/30 px-2 bg-white/30 text-white rounded-md leading-6"
        >
          {{ item }}
        </span>
        <span
          v-for="item in frontmatter?.tags"
          :key="item"
          class="hover:bg-white/30 hover:text-white px-2 rounded-md leading-6 transition-all duration-300"
        >
          <span class="text-white/50"># </span>
          <span class="text-white/80">{{ item }}</span>
        </span>
      </div>
      <h1 class="max-md:text-3xl mt-4 mb-8 text-white text-5xl font-bold">
        {{ frontmatter?.title }}
      </h1>
      <div>
        <div
          class="inline-flex items-center gap-2 text-white/80"
          :datetime="frontmatter?.date"
        >
          <span> </span>
          <span>{{ formatDate(frontmatter?.date)?.string }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
