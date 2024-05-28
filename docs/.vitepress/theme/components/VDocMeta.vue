<script lang="ts" setup>
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <div class="flex items-center gap-8 text-neutral-400">
    <span v-if="Array.isArray(frontmatter?.categories) && frontmatter?.categories?.length > 0">
      <span class="text-sm">分类:</span>
      <span class="text-sm">
        <span v-for="category in frontmatter?.categories" :key="category">{{ category }}</span>
      </span>
    </span>
    <span v-if="Array.isArray(frontmatter?.tags) && frontmatter?.tags?.length > 0">
      <span class="text-sm">标签:</span>
      <span class="text-sm">
        <span v-for="tag in frontmatter?.tags" :key="tag" class="peer peer-[]:ml-1 peer-[]:pl-1 peer-[]:border-l peer-[]:border-solid">{{ tag }}</span>
      </span>
    </span>
  </div>
</template>