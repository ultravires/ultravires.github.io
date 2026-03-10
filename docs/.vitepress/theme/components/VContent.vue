<script lang="ts" setup>
import VDocFooter from '@theme/components/VDocFooter.vue';
import VDocMeta from '@theme/components/VDocMeta.vue';
import PageContainer from './PageContainer.vue';
</script>

<template>
  <PageContainer>
    <article
      ref="docRef"
      id="article"
      class="VPDoc prose prose-lg lg:prose-xl dark:prose-invert prose-pre:rounded-none prose-pre:bg-inherit prose-table:overflow-x-auto prose-table:rounded-2xl prose-th:border prose-th:border-solid dark:prose-th:border-neutral-700 prose-td:border prose-td:border-solid prose-img:max-w-3xl prose-img:mx-auto dark:prose-td:border-neutral-700 max-w-none transition-all duration-300"
    >
      <Content />
    </article>
    <VDocFooter />
    <VDocMeta />
  </PageContainer>
</template>
