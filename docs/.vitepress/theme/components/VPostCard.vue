<script lang="ts" setup>
import type { Post } from '../posts.data';
import VLink from './VLink.vue';

defineProps<{
  post: Post;
}>();

function handleImageError(event) {
  event.target.src = 'https://via.placeholder.com/340x200';
}
</script>

<template>
  <div
    class="dark:bg-neutral-900 hover:border-[rgb(var(--web-color-primary)/1)] group/post-card w-full h-[340px] bg-white border border-solid rounded-lg overflow-hidden transition-all duration-300"
  >
    <VLink class="block h-[calc(100%-9rem)]" :href="post.url">
      <img
        class="w-full h-full bg-transparent border-0 outline-0 object-cover"
        src=""
        alt=""
        loading="lazy"
        @error="handleImageError"
      />
    </VLink>
    <VLink class="flex px-4 w-full h-36 items-center" :href="post.url">
      <div>
        <div
          class="group-hover/post-card:text-[rgb(var(--web-color-primary)/1)] text-xl mb-4 transition-all duration-300"
        >
          {{ post.title }}
        </div>
        <div
          v-html="post.excerpt"
          class="text-sm text-neutral-600 dark:text-neutral-400"
        ></div>
      </div>
    </VLink>
  </div>
</template>
