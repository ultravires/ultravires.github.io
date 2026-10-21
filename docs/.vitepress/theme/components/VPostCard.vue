<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useData } from 'vitepress';
import { computed } from 'vue';
import type { Post } from '../posts.data';
import VLink from './VLink.vue';
import VPostCover from './VPostCover.vue';

const { page } = useData();

const { post, hiddenCategories = [] } = defineProps<{
  post: Post;
  hiddenCategories?: string[];
}>();

const visibleCategories = computed(() =>
  (post?.categories ?? []).filter(
    (category) => !hiddenCategories.includes(category)
  )
);
</script>

<template>
  <article
    class="group/post-card border-line hover:border-primary h-[340px] w-full overflow-hidden rounded-lg border border-solid bg-white dark:bg-neutral-900"
  >
    <VLink
      class="block h-[calc(100%-9rem)] select-none overflow-hidden"
      :href="post.url"
      draggable="false"
    >
      <VPostCover :post="post" />
    </VLink>
    <VLink
      class="flex h-36 w-full flex-col justify-center px-4"
      :href="post.url"
    >
      <h2
        class="wave-text group-hover/post-card:text-primary mb-4 overflow-hidden text-ellipsis whitespace-nowrap text-xl dark:text-white"
      >
        {{ post.title }}
      </h2>
      <div
        v-html="post.excerpt"
        class="line-clamp-2 text-sm text-neutral-600 max-sm:hidden dark:text-neutral-400"
      ></div>
      <div class="mt-4 flex items-center gap-x-3">
        <span
          v-for="category in visibleCategories"
          :key="category"
          class="border-line group-hover/post-card:border-primary/50 group-hover/post-card:text-primary inline-flex shrink-0 items-center gap-1 rounded-full border border-solid px-2 py-0.5 text-xs text-neutral-500 transition-colors dark:text-neutral-400"
        >
          <Icon
            icon="mdi:folder-outline"
            class="text-sm"
          />
          {{ category }}
        </span>
        <span class="flex min-w-0 items-center gap-x-2 overflow-hidden whitespace-nowrap">
          <span
            v-for="tag in post?.tags ?? []"
            :key="tag"
            class="text-xs text-neutral-500 before:mr-px before:text-neutral-400 before:content-['#'] dark:text-neutral-400 dark:before:text-neutral-500"
          >
            {{ tag }}
          </span>
        </span>
        <span class="ml-auto shrink-0 text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
          {{ post.date.string }}
        </span>
      </div>
    </VLink>
  </article>
</template>

<style scoped>
.wave-text {
  position: relative;
  display: inline-block;
  width: fit-content;
  padding-bottom: 4px;
  font-size: 24px;
}

.group\/post-card:hover .wave-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='rgb(71 89 230)' stroke-width='2' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='rgb(71 89 230)' stroke-width='2' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E");
  background-size:
    20px 4px,
    20px 4px;
  animation: wave 1.5s infinite linear;
}

[data-theme='dark'] .group\/post-card:hover .wave-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='rgb(255 107 107)' stroke-width='2' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='rgb(255 107 107)' stroke-width='2' d='M0 3.5c5 0 5-3 10-3s5 3 10 3 5-3 10-3 5 3 10 3'/%3E%3C/svg%3E");
  background-size:
    20px 4px,
    20px 4px;
  animation: wave 1.5s infinite linear;
}

@keyframes wave {
  0% {
    background-position:
      0 0,
      -10px 0;
  }
  100% {
    background-position:
      20px 0,
      10px 0;
  }
}
</style>
