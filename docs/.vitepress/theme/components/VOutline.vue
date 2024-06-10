<script lang="ts" setup>
import { ref } from 'vue';
import { onContentUpdated, useData } from 'vitepress'
import VOutlineItem from './VOutlineItem.vue';
import { getHeaders, useActiveAnchor } from '../composables/outline.js';

const { frontmatter, theme } = useData()

const headers = ref([]);

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

const containerRef = ref(null);
const markerRef = ref(null);

useActiveAnchor(containerRef, markerRef)
</script>

<template>
  <div v-show="headers?.length > 0" ref="containerRef" class="dark:bg-neutral-900 dark:border-neutral-700 max-lg:hidden relative px-4 py-2 bg-white border border-neutral-200 rounded-md">
    <div aria-level="2" class="flex gap-2 items-center mb-2 leading-[32px] font-medium " role="heading">
      <span>页面导航</span>
    </div>
    <div class="relative max-h-64 pl-4 -ml-4 overflow-y-auto">
      <div ref="markerRef" class="absolute -left-[1px] w-1 h-5 bg-green-600 transition-all duration-300"></div>
      <VOutlineItem :headers="headers" :root="true" />
    </div>
  </div>
</template>