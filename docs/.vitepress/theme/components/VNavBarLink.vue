<script lang="ts" setup>
import { useData, type DefaultTheme } from 'vitepress';
import { isActive } from '../support/utils';
import VLink from './VLink.vue';
import VNavBarDropdown from './VNavBarDropdown.vue';

defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const { page } = useData();

const triggerClass =
  'text-md tracking-8 decoration-none hover:bg-primary whitespace-nowrap rounded-full leading-none hover:text-white dark:hover:text-black';
const activeClass =
  'after:bg-primary active relative after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-3 after:-translate-x-1/2 after:rounded-full';
</script>

<template>
  <VNavBarDropdown v-if="item.items && item.items.length > 0">
    <template #trigger="{ open }">
      <VLink
        class="flex h-8 items-center px-3 lg:px-4"
        :class="[
          triggerClass,
          {
            [activeClass]: isActive(
              page.relativePath,
              item.activeMatch || item.link,
              !!item.activeMatch
            ),
            'bg-primary text-white dark:text-black': open
          }
        ]"
        :href="item.link"
      >
        {{ item.text }}
      </VLink>
    </template>
    <div
      class="border-primary text-normal flex h-[50px] cursor-default items-center gap-2 rounded-full border border-solid bg-white p-2 tracking-wide text-black shadow-lg dark:bg-neutral-900 dark:text-white"
    >
      <VLink
        v-for="item in item.items"
        class="decoration-none text-normal hover:bg-primary relative flex h-8 items-center whitespace-nowrap rounded-full px-4 transition-all duration-300 hover:px-5 hover:text-white dark:hover:text-black"
        :class="{
          [activeClass]: isActive(
            page.relativePath,
            item.activeMatch || item.link,
            !!item.activeMatch
          )
        }"
        :href="item.link || 'javascript:void(0)'"
      >
        {{ item.text }}
      </VLink>
    </div>
  </VNavBarDropdown>
  <VLink
    v-else
    class="flex h-8 items-center px-3 lg:px-4"
    :class="[
      triggerClass,
      {
        [activeClass]: isActive(
          page.relativePath,
          item.activeMatch || item.link,
          !!item.activeMatch
        )
      }
    ]"
    :href="item.link"
  >
    {{ item.text }}
  </VLink>
</template>
