<script setup>
import VPostList from '@theme/components/VPostList.vue';
import { useData } from 'vitepress';
import { computed } from 'vue';
import { data as posts } from '../posts.data.ts';
import { isActive } from '../support/utils.js';

const { frontmatter, page, theme } = useData();

// 获取当前页面的分类 - 使用 computed 保持响应性
const currentPageCategories = computed(
  () => frontmatter.value.categories || []
);

// 过滤出包含任一分类的文章 - 使用 computed 确保数据自动更新
const filteredPosts = computed(() => {
  return posts.filter((post) => {
    const postCategories = post.categories || [];
    // 检查是否有任一分类匹配
    return currentPageCategories.value.some((category) =>
      postCategories.includes(category)
    );
  });
});

// 专栏列表取自导航配置中的「专栏」分组，保持单一数据源
const columns = computed(() => {
  const group = (theme.value.nav || []).find((item) => item.text === '专栏');
  return group?.items || [];
});

// 刊头标题优先使用 frontmatter.title，缺省时回退到第一个分类名
const columnTitle = computed(
  () => frontmatter.value.title || currentPageCategories.value[0] || ''
);

const isCurrentColumn = (item) =>
  isActive(
    page.value.relativePath,
    item.activeMatch || item.link,
    !!item.activeMatch
  );
</script>

<template>
  <section class="container mx-auto min-h-dvh">
    <main class="@container/main">
      <div
        class="mx-auto rounded-xl border border-slate-200 bg-white px-8 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <!-- 专栏刊头：栏目名 + 定位语 + 篇数 + 栏目切换 -->
        <header class="mt-4">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <h1 class="text-3xl font-bold max-md:text-2xl">
              {{ columnTitle
              }}<span
                v-if="columnTitle"
                class="text-primary"
                >。</span
              >
            </h1>
            <span
              class="shrink-0 text-sm text-neutral-400 dark:text-neutral-500"
            >
              共 {{ filteredPosts.length }} 篇
            </span>
          </div>
          <p
            v-if="frontmatter.description"
            class="mt-2 max-w-[60ch] text-neutral-500 dark:text-neutral-400"
          >
            {{ frontmatter.description }}
          </p>

          <!-- 栏目切换：当前专栏实心高亮，同时回答「我在哪」与「还能去哪」 -->
          <nav
            v-if="columns.length > 1"
            aria-label="专栏切换"
            class="mb-2 mt-6 flex flex-wrap gap-2 border-b border-slate-100 pb-6 dark:border-neutral-700/60"
          >
            <a
              v-for="column in columns"
              :key="column.text"
              :href="column.link"
              :aria-current="isCurrentColumn(column) ? 'page' : undefined"
              class="decoration-none rounded-full px-4 py-1.5 text-sm transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              :class="
                isCurrentColumn(column)
                  ? 'bg-primary font-bold text-white dark:text-black'
                  : 'text-neutral-500 hover:bg-primary hover:text-white dark:text-neutral-400 dark:hover:text-black'
              "
            >
              {{ column.text }}
            </a>
          </nav>
        </header>

        <VPostList :posts="filteredPosts" />
      </div>
    </main>
  </section>
</template>
