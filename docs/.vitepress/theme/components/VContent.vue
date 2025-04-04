<script lang="ts" setup></script>

<template>
  <div class="@8xl:max-w-[87.5rem] max-md:px-2 px-8 mx-auto">
    <div
      class="order-1 w-full p-12 mx-auto overflow-auto transition-all duration-300 bg-white border border-solid rounded-md dark:bg-neutral-900 dark:max-md:bg-transparent max-md:px-6 max-md:border-0 max-md:bg-transparent border-line"
    >
      <article
        ref="docRef"
        id="article"
        class="prose prose-lg transition-all duration-300 VPDoc lg:prose-xl dark:prose-invert prose-table:overflow-x-auto prose-th:border prose-th:border-solid prose-td:border prose-td:border-solid max-w-none"
      >
        <Content />
      </article>
      <VDocFooter />
      <VDocMeta />
    </div>
  </div>
</template>

<style>
.VPDoc.prose pre {
  background-color: inherit;
}
</style>