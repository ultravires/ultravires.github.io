<script lang="ts" setup>
import type { Post } from '../posts.data';
import VLink from './VLink.vue';
import VPostCover from './VPostCover.vue';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div
    class="dark:bg-neutral-900 hover:border-[rgb(var(--web-color-primary)/1)] group/post-card w-full h-[340px] bg-white border border-solid rounded-lg shadow-sm overflow-hidden transition-colors duration-300"
  >
    <VLink class="block h-[calc(100%-9rem)] overflow-hidden select-none" :href="post.url" draggable="false">
      <VPostCover :post="post" />
    </VLink>
    <VLink
      class="flex flex-col justify-center px-4 w-full h-36"
      :href="post.url"
    >
      <div
        class="group-hover/post-card:text-[rgb(var(--web-color-primary)/1)] text-xl mb-4 font-AlibabaPuHuiTiSemiBold dark:text-white"
      >
        {{ post.title }}
      </div>
      <div
        v-html="post.excerpt"
        class="max-sm:hidden text-sm text-neutral-600 dark:text-neutral-400"
      ></div>
      <div class="flex justify-between mt-4">
        <div>
          <span
            v-for="tag in post?.tags ?? []"
            :key="tag"
            class="dark:text-neutral-400 mx-2 text-neutral-500 text-sm"
          >
            <span>#</span>
            <span>{{ tag }}</span>
          </span>
        </div>
        <div
          class="text-sm"
        >
          {{ post.date.string }}
        </div>
      </div>
    </VLink>
  </div>
</template>
