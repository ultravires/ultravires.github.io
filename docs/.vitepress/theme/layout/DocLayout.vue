<script lang="ts" setup>
import { useData } from 'vitepress';
import VDocMeta from '@theme/components/VDocMeta.vue';
import VDocFooter from '@theme/components/VDocFooter.vue';
import VOutline from '@theme/components/VOutline.vue';
import VProfileCard from '@theme/components/VProfileCard.vue';
import VCopyright from '@theme/components/VCopyright.vue';

const { frontmatter } = useData();
</script>

<template>
  <div class="@8xl:max-w-[87.5rem] max-md:px-2 px-8 mx-auto">
    <div class="max-xl:flex-col flex gap-6 justify-center w-full">
      <aside
        v-if="frontmatter.aside !== false"
        class="max-xl:hidden order-2 flex-grow-1 flex-shrink-0 flex flex-col gap-3 relative w-80"
      >
        <VProfileCard />
        <div
          class="sticky flex flex-col gap-4 top-[calc(var(--web-header-height)+1rem)]"
        >
          <VOutline />
          <VCopyright />
        </div>
      </aside>
      <div
        class="dark:bg-neutral-900 dark:max-md:bg-transparent max-md:px-6 max-md:border-0 max-md:bg-transparent order-1 p-12 w-full mx-auto bg-white rounded-md border border-solid border-[rgb(var(--web-border-color)/1)] overflow-auto transition-all duration-300"
      >
        <article
          ref="docRef"
          id="article"
          class="VPDoc lg:prose-xl dark:prose-invert dark:prose-pre:border-neutral-700 prose-pre:border prose-pre:border-solid prose-pre:border-[rgb(var(--web-border-color)/1)] prose-code:px-2 prose-code:py-1 prose-code:bg-primary prose-code:bg-opacity-10 prose-code:text-primary prose-code:rounded-md prose-blockquote:not-italic prose-blockquote:font-normal prose-table:block prose-table:overflow-x-auto prose-th:border prose-th:border-solid prose-td:border prose-td:border-solid max-w-none prose prose-lg prose-neutral transition-all duration-300"
        >
          <Content />
        </article>
        <VDocFooter />
        <VDocMeta />
      </div>
    </div>
  </div>
</template>
