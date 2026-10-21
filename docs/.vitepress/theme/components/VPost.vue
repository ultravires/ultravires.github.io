<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import type { Post } from '../posts.data';

const { post, hiddenCategories = [] } = defineProps<{
  post: Post;
  hiddenCategories?: string[];
}>();

const visibleCategories = computed(() =>
  post.categories.filter((category) => !hiddenCategories.includes(category))
);
</script>

<template>
  <a
    class="group block rounded-2xl p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700"
    :href="post.url"
  >
    <h2
      :id="post.title"
      class="group-hover:text-primary font-bold transition-colors"
      :title="post.title"
    >
      {{ post.title }}
    </h2>
    <div
      v-if="post.excerpt"
      v-html="post.excerpt"
      class="mt-1 line-clamp-2 font-thin text-neutral-600 dark:text-neutral-400"
    ></div>
    <div class="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
      <span
        v-for="category in visibleCategories"
        :key="category"
        class="border-line group-hover:border-primary/50 group-hover:text-primary inline-flex items-center gap-1 rounded-full border border-solid px-2 py-0.5 text-xs text-neutral-500 transition-colors dark:text-neutral-400"
      >
        <Icon
          icon="mdi:folder-outline"
          class="text-sm"
        />
        {{ category }}
      </span>
      <span
        v-for="tag in post.tags"
        :key="tag"
        class="text-xs text-neutral-500 before:mr-px before:text-neutral-400 before:content-['#'] dark:text-neutral-400 dark:before:text-neutral-500"
      >
        {{ tag }}
      </span>
      <span
        v-if="post.date"
        class="ml-auto text-xs tabular-nums text-neutral-400 dark:text-neutral-500"
      >
        {{ post.date.string }}
      </span>
    </div>
  </a>
</template>
