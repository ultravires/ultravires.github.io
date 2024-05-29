<script lang="ts" setup>
import type { Post } from '../posts.data';

defineProps<{
  post: Post
}>();
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="order-1 max-md:hidden">
      <span class="dark:text-neutral-400 text-neutral-300 text-lg whitespace-nowrap text-ellipsis overflow-hidden">{{ post.date.string }}</span>
    </div>
    <div class="order-2">
      <h2 :id="post.title" class="text-lg" :title="post.title">
        <a class="hover:text-primary whitespace-nowrap text-ellipsis overflow-hidden" :href="post.url">{{ post.title }}</a>
      </h2>
      <div v-if="post.excerpt" v-html="post.excerpt" class="dark:text-neutral-400 text-neutral-300"></div>
    </div>
  </div>
</template>