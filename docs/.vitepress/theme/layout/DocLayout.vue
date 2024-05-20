<script lang="ts" setup>
import VCopyright from '../components/VCopyright.vue';
import VHeader from '../components/VHeader.vue';
</script>

<template>
  <VHeader />
  <div class="container mx-auto py-12">
    <article id="article" class="dark:bg-slate-950 dark:border-slate-800 dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:px-2 prose-code:py-1 prose-code:text-primary prose-code:text-opacity-90 prose-code:bg-primary prose-code:bg-opacity-10 prose-code:rounded-md prose-code:text-sm prose-blockquote:not-italic prose-blockquote:font-normal md:prose-lg lg:prose-xl prose prose-lg max-w-none p-12 mx-auto bg-white rounded-md border border-solid border-slate-100 shadow-sm">
      <Content />
      <VCopyright class="not-prose" />
    </article>
  </div>
</template>
