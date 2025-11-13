<script lang="ts" setup>
import type { Post } from '../posts.data';

const { post } = defineProps<{
  post: Post;
}>();
</script>

<template>
  <a
    class="group block rounded-2xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700"
    :href="post.url"
  >
    <div class="flex flex-col items-start">
      <div class="order-1 max-md:hidden">
        <span class="ellipsis text-sm text-neutral-400 dark:text-neutral-400">
          {{ post.date.string }}
        </span>
      </div>
      <div class="order-2">
        <h2
          :id="post.title"
          class="font-bold group-hover:text-primary"
          :title="post.title"
        >
          {{ post.title }}
        </h2>
        <div
          v-if="post.excerpt"
          v-html="post.excerpt"
          class="font-thin text-neutral-600 dark:text-neutral-400"
        ></div>
      </div>
    </div>
  </a>
</template>
