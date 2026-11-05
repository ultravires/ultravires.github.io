<script lang="ts" setup>
import VDocFooter from '@theme/components/VDocFooter.vue';
import VDocMeta from '@theme/components/VDocMeta.vue';
</script>

<template>
  <article
    ref="docRef"
    id="article"
    class="VPDoc prose prose-lg max-w-none transition-all duration-300 lg:prose-xl dark:prose-invert prose-pre:rounded-none prose-pre:bg-inherit prose-table:rounded-2xl prose-th:border prose-th:border-solid dark:prose-th:border-neutral-700 prose-td:border prose-td:border-solid dark:prose-td:border-neutral-700 prose-img:mx-auto prose-img:max-w-3xl"
  >
    <Content />
  </article>
  <VDocFooter />
  <VDocMeta />
</template>
