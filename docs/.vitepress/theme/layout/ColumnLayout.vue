<script setup>
import VPostList from '@theme/components/VPostList.vue';
import { useData } from 'vitepress';
import { computed } from 'vue';
import { data as posts } from '../posts.data.ts';

const { frontmatter } = useData();

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
</script>

<template>
  <section class="container mx-auto min-h-dvh">
    <main class="@container/main">
      <div
        class="mx-auto rounded-xl border border-slate-200 bg-white px-8 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <VPostList :posts="filteredPosts" />
      </div>
    </main>
  </section>
</template>
