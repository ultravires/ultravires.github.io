<script lang="ts" setup>
import PageContainer from '@theme/components/PageContainer.vue';
import VSiteStats from '@theme/components/VSiteStats.vue';
import VTopPages from '@theme/components/VTopPages.vue';
import VVisitorProfile from '@theme/components/VVisitorProfile.vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <PageContainer>
    <!-- 刊头：标题 + 定位语 -->
    <header class="mt-4">
      <h1 class="text-3xl font-bold max-md:text-2xl">
        {{ frontmatter.title }}
        <span
          v-if="frontmatter.title"
          class="text-primary"
        >
          。
        </span>
      </h1>
      <p
        v-if="frontmatter.description"
        class="mt-2 max-w-[60ch] text-neutral-500 dark:text-neutral-400"
      >
        {{ frontmatter.description }}
      </p>
    </header>

    <VSiteStats class="mt-8" />

    <VTopPages
      class="mt-10 border-t border-solid border-slate-100 pt-8 dark:border-neutral-700/60"
    />

    <VVisitorProfile
      class="mb-4 mt-10 border-t border-solid border-slate-100 pt-8 dark:border-neutral-700/60"
    />
  </PageContainer>
</template>
