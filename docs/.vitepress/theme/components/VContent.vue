<script lang="ts" setup></script>

<template>
  <div class="@8xl:max-w-[87.5rem] max-md:px-2 px-8 mx-auto">
    <div
      class="dark:bg-neutral-900 dark:max-md:bg-transparent max-md:px-6 max-md:border-0 max-md:bg-transparent order-1 p-12 w-full mx-auto bg-white rounded-md border border-solid border-line overflow-auto transition-all duration-300"
    >
      <article
        ref="docRef"
        id="article"
        class="VPDoc lg:prose-xl dark:prose-invert dark:prose-pre:border-neutral-700 prose-pre:border prose-pre:border-solid prose-pre:border-[rgb(var(--web-border-color)/1)] prose-code:px-2 prose-code:py-1 prose-code:bg-primary/10 prose-code:text-primary prose-code:rounded-md prose-blockquote:not-italic prose-blockquote:font-normal prose-table:overflow-x-auto prose-th:border prose-th:border-solid prose-td:border prose-td:border-solid max-w-none prose prose-lg prose-neutral transition-all duration-300"
      >
        <Content />
      </article>
      <VDocFooter />
      <VDocMeta />
    </div>
  </div>
</template>
