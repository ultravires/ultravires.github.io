<script setup>
import { useData } from 'vitepress';
import { formatDate } from '@theme/support/utils';
import VIconTime from '../assets/svg/time.svg?component';
import LiquidClassCard from './LiquidClassCard.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.banner && frontmatter?.title"
    class="@container absolute w-full h-full top-0 left-0"
  >
    <div
      class="max-md:items-center max-md:px-4 px-10 flex flex-col justify-center items-start gap-2 mx-auto w-full h-full"
    >
      <div class="flex gap-2 items-center">
        <LiquidClassCard
          v-for="item in frontmatter?.categories"
          :key="item"
          class="px-2 rounded-full text-white/80"
        >
          {{ item }}
        </LiquidClassCard>
        <LiquidClassCard
          v-for="item in frontmatter?.tags"
          :key="item"
          class="px-2 rounded-full text-white/80"
        >
          <span class="text-white/50"># </span>
          <span class="text-white/80">{{ item }}</span>
        </LiquidClassCard>
      </div>
      <h1 class="mt-4 mb-8 text-white text-6xl font-bold drop-shadow-md">
        {{ frontmatter?.title }}
      </h1>
      <div>
        <div
          class="inline-flex items-center gap-2 text-white/80"
          :datetime="page.lastUpdated"
        >
          <span>
            <VIconTime />
          </span>
          <span>更新于 {{ formatDate(page.lastUpdated)?.string }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
