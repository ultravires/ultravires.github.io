<script lang="ts" setup>
import VHeader from '../components/VHeader.vue';
import VDocMeta from '../components/VDocMeta.vue'
import VDocFooter from '../components/VDocFooter.vue';

</script>

<template>
  <VHeader />
  <div class="container mx-auto py-12">
    <div class="
      max-md:px-6
      max-sm:px-6
      max-sm:border-0
      max-sm:bg-transparent
      dark:bg-neutral-900
      dark:border-neutral-700
      p-12
      mx-auto
      bg-white
      rounded-md
      border
      border-solid
      border-neutral-200
    ">
      <article
        id="article"
        class="
          VDoc
          lg:prose-xl
          dark:prose-invert
          dark:prose-pre:border-neutral-700
          prose-pre:border
          prose-pre:border-solid
          prose-pre:border-neutral-200
          prose-code:px-2
          prose-code:py-1
          prose-code:bg-primary
          prose-code:bg-opacity-10
          prose-code:text-primary
          prose-code:rounded-md
          prose-blockquote:not-italic
          prose-blockquote:font-normal
          max-w-none
          prose
          prose-lg
          prose-neutral
        "
      >
        <Content />
        <VDocMeta />
      </article>
      <VDocFooter />
    </div>
  </div>
</template>
