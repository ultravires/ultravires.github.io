<script lang="ts" setup>
import VDocMeta from '../components/VDocMeta.vue'
import VDocFooter from '../components/VDocFooter.vue';
import VOutline from '../components/VOutline.vue';
import VProfileCard from '../components/VProfileCard.vue';
</script>

<template>
  <div class="@container">
    <div class="@8xl:max-w-[87.5rem] md:px-6 max-md:container mx-auto">
      <div class="max-lg:flex-col flex gap-3 justify-center w-full">
        <aside class="order-2 flex-grow-1 flex-shrink-0 flex flex-col gap-3 relative w-80">
          <VProfileCard />
          <div class="sticky flex flex-col top-[calc(var(--web-header-height)+1rem)]">
            <VOutline />
          </div>
        </aside>
        <div class="
          dark:bg-neutral-900
          dark:border-neutral-700
          dark:max-sm:bg-transparent
          max-md:px-6
          max-sm:px-6
          max-sm:border-0
          max-sm:bg-transparent
          order-1
          p-12
          w-full
          mx-auto
          bg-white
          rounded-md
          border
          border-solid
          border-neutral-200
          overflow-auto
        ">
          <article
            ref="docRef"
            id="article"
            class="
              VPDoc
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
              prose-table:block
              prose-table:overflow-x-auto
              prose-th:border
              prose-th:border-solid
              prose-td:border
              prose-td:border-solid
              max-w-none
              prose
              prose-lg
              prose-neutral
            "
          >
            <Content />
          </article>
          <VDocFooter />
          <VDocMeta />
        </div>
      </div>
    </div>
  </div>
</template>
