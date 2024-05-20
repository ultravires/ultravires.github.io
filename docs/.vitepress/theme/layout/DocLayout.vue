<script lang="ts" setup>
import VCopyright from '../components/VCopyright.vue';
import VHeader from '../components/VHeader.vue';
</script>

<template>
  <VHeader />
  <article id="article" class="dark:prose-invert prose-code:before:content-none prose-code:after:content-none prose-code:px-2 prose-code:py-1 prose-code:text-primary prose-code:text-opacity-90 prose-code:bg-primary prose-code:bg-opacity-10 prose-code:rounded-md prose-code:text-sm prose-blockquote:not-italic md:prose-lg lg:prose-xl prose prose-lg px-6 py-12 mx-auto">
    <Content />
    <VCopyright class="not-prose" />
  </article>
</template>
