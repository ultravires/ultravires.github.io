<script lang="ts" setup>
import { useData } from 'vitepress';
import VCopyright from '../components/VCopyright.vue';
import VHeader from '../components/VHeader.vue';

const { frontmatter } = useData();
</script>

<template>
  <VHeader />
  <div class="container mx-auto py-12">
    <article id="article" class="dark:bg-neutral-900 dark:border-neutral-800 dark:prose-pre:border-neutral-800 dark:prose-invert prose-pre:border prose-pre:border-solid prose-pre:border-neutral-200 prose-code:before:content-none prose-code:after:content-none prose-code:px-2 prose-code:py-1 prose-code:text-primary prose-code:text-opacity-90 prose-code:bg-primary prose-code:bg-opacity-10 prose-code:rounded-md prose-code:text-sm prose-blockquote:not-italic prose-blockquote:font-normal md:prose-lg lg:prose-xl prose prose-lg max-w-none p-12 mx-auto bg-white rounded-md border border-solid border-neutral-200">
      <div class="flex items-center gap-8">
        <span v-if="Array.isArray(frontmatter.categories) && frontmatter.categories.length > 0">
          <span class="text-sm">分类:</span>
          <span class="text-sm">
            <span v-for="category in frontmatter.categories" :key="category">{{ category }}</span>
          </span>
        </span>
        <span v-if="Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0">
          <span class="text-sm">标签:</span>
          <span class="text-sm">
            <span v-for="tag in frontmatter.tags" :key="tag" class="peer peer-[]:ml-1 peer-[]:pl-1 peer-[]:border-l peer-[]:border-solid">{{ tag }}</span>
          </span>
        </span>
      </div>
      <Content />
      <VCopyright class="not-prose" />
    </article>
  </div>
</template>
