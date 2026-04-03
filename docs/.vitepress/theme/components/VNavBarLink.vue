<script lang="ts" setup>
import { useData, type DefaultTheme } from 'vitepress';
import { isActive } from '../support/utils';
import VLink from './VLink.vue';
import LiquidClassCard from './LiquidClassCard.vue';

defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const { page } = useData();
</script>

<template>
  <VLink
    class="px-4 py-2"
    :class="{
      'after:bg-primary active relative after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-3 after:-translate-x-1/2 after:rounded-full':
        isActive(
          page.relativePath,
          item.activeMatch || item.link,
          !!item.activeMatch
        )
    }"
    :href="item.link"
  >
    {{ item.text }}
    <div
      v-if="item.items && item.items.length > 0"
      class="pointer-events-none absolute left-1/2 top-full z-10 -translate-x-1/2 scale-75 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
    >
      <LiquidClassCard
        class="border-primary text-normal mt-3 h-[50px] flex cursor-default items-center gap-2 rounded-full border border-solid bg-white/90 p-2 tracking-wide text-black backdrop-blur-md dark:bg-neutral-900 dark:text-white"
      >
        <VLink
          v-for="item in item.items"
          class="decoration-none text-normal hover:bg-primary relative whitespace-nowrap rounded-full px-4 py-2 transition-all duration-300 hover:px-5 hover:text-white dark:hover:text-black"
          :class="{
            'after:bg-primary active relative after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-3 after:-translate-x-1/2 after:rounded-full':
              isActive(
                page.relativePath,
                item.activeMatch || item.link,
                !!item.activeMatch
              )
          }"
          :href="item.link || 'javascript:void(0)'"
        >
          {{ item.text }}
        </VLink>
      </LiquidClassCard>
    </div>
  </VLink>
</template>
