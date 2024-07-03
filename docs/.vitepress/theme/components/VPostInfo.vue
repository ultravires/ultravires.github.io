<script setup>
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.banner && frontmatter?.title"
    class="@container absolute w-full h-full top-[var(--web-header-height)] left-0 right-0"
  >
    <div
      class="@8xl:max-w-[87.5rem] max-md:items-center max-md:px-4 px-10 flex flex-col justify-center items-start gap-2 mx-auto w-full h-[calc(100%-60px-var(--web-header-height))]"
    >
      <div class="flex gap-2 items-center">
        <span
          v-for="item in frontmatter?.categories"
          :key="item"
          class="px-2 bg-white bg-opacity-30 text-white rounded-md"
        >
          {{ item }}
        </span>
        <span v-for="item in frontmatter?.tags" :key="item">
          <span class="text-white text-opacity-50"># </span>
          <span class="text-white text-opacity-80 text-xl">{{ item }}</span>
        </span>
      </div>
      <h1
        class="my-2 text-white text-4xl font-bold text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {{ frontmatter?.title }}
      </h1>
      <div>
        <time class="text-white" :datetime="frontmatter?.date">
          {{ frontmatter?.date }}
        </time>
      </div>
    </div>
  </div>
</template>
