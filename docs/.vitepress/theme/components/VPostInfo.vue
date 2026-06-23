<script setup>
import { formatDate } from '@theme/support/utils';
import { useData } from 'vitepress';
import VIconTime from '../assets/svg/time.svg?component';
import LiquidClassCard from './LiquidClassCard.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <div
    v-show="frontmatter?.banner && frontmatter?.title"
    class="@container absolute left-0 top-0 h-full w-full"
  >
    <div
      class="mx-auto flex h-full w-full flex-col items-start justify-center gap-2 px-10 max-md:items-center max-md:px-4"
    >
      <div class="flex items-center gap-2">
        <LiquidClassCard
          v-for="item in frontmatter?.categories"
          :key="item"
          class="rounded-full px-2 text-white/80"
        >
          {{ item }}
        </LiquidClassCard>
        <LiquidClassCard
          v-for="item in frontmatter?.tags"
          :key="item"
          class="rounded-full px-2 text-white/80"
        >
          <span class="text-white/50">#</span>
          <span class="text-white/80">{{ item }}</span>
        </LiquidClassCard>
      </div>
      <h1 class="mb-8 mt-4 text-6xl font-bold text-white drop-shadow-md">
        {{ frontmatter?.title }}
      </h1>
      <div>
        <div
          class="inline-flex items-center gap-2 text-white/80"
          :datetime="page.frontmatter.date || page.lastUpdated"
        >
          <span>
            <VIconTime />
          </span>
          <span>
            更新于
            {{ formatDate(page.frontmatter.date || page.lastUpdated)?.string }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
