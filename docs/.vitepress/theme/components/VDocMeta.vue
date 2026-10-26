<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useData } from 'vitepress';
import { usePageView } from '../composables/usePageView';

const { frontmatter } = useData();
const { pv, failed, isArticle } = usePageView();
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
    <div
      v-if="
        Array.isArray(frontmatter?.categories) &&
        frontmatter?.categories?.length > 0
      "
      class="flex flex-wrap items-center gap-2"
    >
      <span
        v-for="category in frontmatter?.categories"
        :key="category"
        class="border-line inline-flex items-center gap-1 rounded-full border border-solid px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400"
      >
        <Icon
          icon="mdi:folder-outline"
          class="text-sm"
        />
        {{ category }}
      </span>
    </div>
    <div
      v-if="Array.isArray(frontmatter?.tags) && frontmatter?.tags?.length > 0"
      class="flex flex-wrap items-center gap-x-3 gap-y-1"
    >
      <span
        v-for="tag in frontmatter?.tags"
        :key="tag"
        class="text-xs text-neutral-500 before:mr-px before:text-neutral-400 before:content-['#'] dark:text-neutral-400 dark:before:text-neutral-500"
      >
        {{ tag }}
      </span>
    </div>
    <!-- 本文阅读数（近 30 天快照，加载失败或未入榜时静默隐藏） -->
    <span
      v-if="isArticle && !failed && pv !== null"
      class="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"
      title="近 30 天阅读数，每 2 天更新"
    >
      <Icon
        icon="mdi:eye-outline"
        class="text-sm"
      />
      阅读 {{ pv.toLocaleString() }} 次
    </span>
  </div>
</template>
