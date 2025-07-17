<script lang="ts" setup>
import VDocMeta from '@theme/components/VDocMeta.vue';
import VDocFooter from '@theme/components/VDocFooter.vue';
</script>

<template>
  <div class="@8xl:max-w-[87.5rem] max-md:px-2 px-8 mx-auto">
    <div
      class="order-1 w-full p-12 mx-auto overflow-auto transition-all duration-300 bg-white border border-solid rounded-md dark:bg-neutral-900 dark:max-md:bg-transparent max-md:px-6 max-md:border-0 max-md:bg-transparent border-line"
    >
      <article
        ref="docRef"
        id="article"
        class="lg:prose-xl prose prose-lg prose-pre:bg-inherit transition-all duration-300 VPDoc prose-table:rounded-2xl prose-table:overflow-x-auto prose-th:border prose-th:border-solid prose-td:border prose-td:border-solid max-w-none dark:prose-invert dark:prose-th:border-neutral-700 dark:prose-td:border-neutral-700"
      >
        <Content />
      </article>
      <VDocFooter />
      <VDocMeta />
    </div>
  </div>
</template>
