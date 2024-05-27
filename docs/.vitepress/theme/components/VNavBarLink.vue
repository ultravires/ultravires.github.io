<script lang="ts" setup>
import { useData, type  DefaultTheme  } from 'vitepress';
import { isActive } from '../support/utils';
import VLink from './VLink.vue';

defineProps<{
  item: DefaultTheme.NavItemWithLink
}>();

const { page } = useData();
</script>

<template>
  <VLink
    class="px-4 py-2 transition-colors duration-300"
    :class="{
      'after:absolute after:w-3 after:h-1 after:bg-primary after:rounded-full after:bottom-0 after:left-1/2 after:-translate-x-1/2 active relative': isActive(
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
      class="
        dark:bg-neutral-900
        group-hover:pointer-events-auto
        group-hover:opacity-100
        group-hover:scale-100
        group-[]:pointer-events-none
        group-[]:opacity-0
        group-[]:scale-75
        before:content-['']
        before:absolute
        before:top-0
        before:-translate-y-full
        before:w-full
        before:h-[12px]
        absolute
        flex
        items-center
        gap-2
        p-2
        mt-[10px]
        bg-white
        bg-opacity-90
        border
        border-solid
        border-primary
        rounded-full
        text-base
        tracking-wide
        cursor-default
        backdrop-blur-md
        -translate-x-1/2
        left-1/2
        top-full
        z-10
        transition-all
        duration-300
      ">
      <VLink
        v-for="item in item.items"
        class="
          dark:hover:text-reverse
          hover:bg-primary
          hover:px-5
          hover:py-3
          hover:text-reverse
          relative
          px-4
          py-2
          decoration-none
          rounded-full
          whitespace-nowrap
          text-base
          transition-all
          duration-300
        "
        :class="{
          'after:absolute after:w-3 after:h-1 after:bg-primary after:rounded-full after:bottom-0 after:left-1/2 after:-translate-x-1/2 active relative': isActive(
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
  </VLink>
</template>