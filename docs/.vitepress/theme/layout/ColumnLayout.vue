<script setup>
import { useData } from 'vitepress';
import { ref, computed } from 'vue';
import { data as posts } from '../posts.data.ts';
import VPost from '@theme/components/VPost.vue';
import VPostCard from '@theme/components/VPostCard.vue';
import VProfileCard from '@theme/components/VProfileCard.vue';
import VOutline from '@theme/components/VOutline.vue';
import VCopyright from '@theme/components/VCopyright.vue';

const { frontmatter } = useData();

// 获取当前页面的分类 - 使用 computed 保持响应性
const currentPageCategories = computed(() => frontmatter.value.categories || []);

// 过滤出包含任一分类的文章 - 使用 computed 确保数据自动更新
const filteredPosts = computed(() => {
  return posts.filter(post => {
    const postCategories = post.categories || [];
    // 检查是否有任一分类匹配
    return currentPageCategories.value.some(category => 
      postCategories.includes(category)
    );
  });
});

const type = ref('card'); // 'card' | 'list'
</script>

<template>
  <div class="@container">
    <div class="@8xl:max-w-[87.5rem] max-md:container md:px-6 mx-auto">
      <div class="flex gap-6">
        <div class="flex-1">
          <!-- 当没有匹配的文章时显示提示信息 -->
          <div v-if="filteredPosts.length === 0" class="text-center py-12">
            <h2 class="text-xl font-medium mb-2">暂无相关文章</h2>
            <p class="text-gray-500">该专栏下还没有发布任何文章</p>
          </div>
          
          <!-- 当有匹配的文章时显示文章列表 -->
          <ul v-else class="flex flex-wrap w-full">
            <li
              v-for="post in filteredPosts"
              :key="post.title"
              :class="[
                {
                  'max-md:w-full max-md:mr-0 even:mr-0 w-[calc(calc(100%-1rem)/2)] mr-4 mb-4':
                    type === 'card',
                },
                { 'w-full mb-8': type === 'list' },
              ]"
            >
              <VPost v-if="type === 'list'" :post="post" />
              <VPostCard v-else-if="type === 'card'" :post="post" />
            </li>
          </ul>
        </div>
        <aside class="shrink-0 flex flex-col gap-2 w-72 max-lg:hidden">
          <VProfileCard />
          <div
            class="sticky flex flex-col gap-4 top-[calc(var(--web-header-height)+1rem)]"
          >
            <VOutline />
            <VCopyright />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
