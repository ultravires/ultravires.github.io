<script lang="ts" setup>
import VDocFooter from '@theme/components/VDocFooter.vue';
import VDocMeta from '@theme/components/VDocMeta.vue';
</script>

<template>
  <div
    class="rounded-md border border-slate-200 bg-white p-12 transition-all duration-300 max-md:border-0 max-md:bg-transparent max-md:px-6 dark:border-neutral-700 dark:bg-neutral-800 dark:max-md:bg-transparent"
  >
    <article
      ref="docRef"
      id="article"
      class="VPDoc prose prose-lg max-w-none transition-all duration-300 lg:prose-xl dark:prose-invert prose-pre:border prose-pre:border-[var(--vp-code-block-divider-color)] prose-pre:bg-inherit prose-pre:pl-[40px] prose-table:overflow-x-auto prose-table:rounded-2xl prose-th:border prose-th:border-solid dark:prose-th:border-neutral-700 prose-td:border prose-td:border-solid dark:prose-td:border-neutral-700"
    >
      <Content />
    </article>
    <VDocFooter />
    <VDocMeta />
  </div>
</template>
