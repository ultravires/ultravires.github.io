<script lang="ts" setup>
import VMomentList from '@theme/components/VMomentList.vue';
import GitalkComment from '@theme/components/GitalkComment.vue';
import { useData } from 'vitepress';
import { data as moments } from '../moments.data.js';

const { frontmatter } = useData();
</script>

<template>
  <section class="container mx-auto min-h-dvh">
    <main class="@container/main">
      <div
        class="mx-auto rounded-xl border border-slate-200 bg-white px-8 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <!-- 刊头：标题 + 定位语 + 条数 -->
        <header class="mt-4">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <h1 class="text-3xl font-bold max-md:text-2xl">
              {{ frontmatter.title
              }}<span
                v-if="frontmatter.title"
                class="text-primary"
                >。</span
              >
            </h1>
            <span
              class="shrink-0 text-sm text-neutral-400 dark:text-neutral-500"
            >
              共 {{ moments.length }} 条
            </span>
          </div>
          <p
            v-if="frontmatter.description"
            class="mt-2 max-w-[60ch] text-neutral-500 dark:text-neutral-400"
          >
            {{ frontmatter.description }}
          </p>
        </header>

        <VMomentList
          :moments="moments"
          class="mt-8"
        />

        <!-- 整页共用一条评论串 -->
        <div
          class="mt-4 border-t border-solid border-slate-100 pt-8 dark:border-neutral-700/60"
        >
          <GitalkComment />
        </div>
      </div>
    </main>
  </section>
</template>
