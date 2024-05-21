<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress';
import { useData } from 'vitepress';
import { isActive } from '../support/utils';

defineProps<{
  item: DefaultTheme.NavItemWithLink
}>()

const { page } = useData();

const pageData = page.value;
</script>

<template>
  <a
    :class="{
      active: isActive(
        pageData.relativePath,
        item.activeMatch || item.link,
        !!item.activeMatch
      )
    }"
    :href="item.link || 'javascript:void(0)'"
  >
    {{ item.text }}
    <div v-if="item.items && item.items.length > 0" class="dark:bg-neutral-900 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100 group-[]:pointer-events-none group-[]:opacity-0 group-[]:scale-90 before:content-[''] before:absolute before:top-0 before:-translate-y-full before:w-full before:h-[12px] absolute flex items-center gap-2 -translate-x-1/2 p-2 mt-[10px] bg-white bg-opacity-90 border border-solid border-primary rounded-full text-base tracking-wide cursor-default backdrop-blur-md left-1/2 top-full z-10">
      <a
        v-for="item in item.items"
        class="dark:hover:text-reverse dark:text-white hover:bg-primary hover:px-5 hover:py-3 hover:text-reverse relative px-4 py-2 decoration-none rounded-full whitespace-nowrap text-black"
        :href="item.link || 'javascript:void(0)'"
      >
        {{ item.text }}
      </a>
    </div>
  </a>
</template>