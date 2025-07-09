<script lang="ts" setup>
import { useData } from 'vitepress';
import VOutline from '@theme/components/VOutline.vue';
import VProfileCard from '@theme/components/VProfileCard.vue';
import VCopyright from '@theme/components/VCopyright.vue';
import VContent from '@theme/components/VContent.vue';

const { frontmatter } = useData();
</script>

<template>
  <div class="@8xl:max-w-[87.5rem] max-md:px-2 px-8 mx-auto">
    <div class="max-xl:flex-col flex gap-6 justify-center w-full">
      <aside
        v-if="frontmatter.aside !== false"
        class="max-xl:hidden order-2 grow-1 shrink-0 flex flex-col gap-3 relative w-80 min-w-[20rem]"
        style="min-width: 16rem;"
      >
        <VProfileCard />
        <div
          class="sticky flex flex-col gap-4 top-[calc(var(--web-header-height)+1rem)]"
        >
          <VOutline />
          <VCopyright />
        </div>
      </aside>
      <VContent />
    </div>
  </div>
</template>
