<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import VQrCode from './VQrCode.vue';

interface Props {
  /** 图标 */
  icon: string;
  /** 二维码内容 */
  qrcode: string;
  /** 二维码下方提示文案 */
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: '扫码加微信'
});
</script>

<template>
  <span class="group relative inline-block">
    <span
      class="block cursor-pointer text-gray-600 hover:text-black dark:text-gray-200 dark:hover:text-white"
      role="button"
      tabindex="0"
      :aria-label="text"
    >
      <Icon
        :icon="icon"
        class="text-3xl"
      />
    </span>
    <span
      class="invisible absolute top-full left-1/2 z-50 mt-3 flex -translate-x-1/2 translate-y-1 flex-col items-center gap-2 rounded-xl border border-neutral-100 bg-white p-3 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 dark:border-neutral-700 dark:bg-neutral-700"
    >
      <span
        class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-t border-l border-neutral-100 bg-white dark:border-neutral-700 dark:bg-neutral-700"
      ></span>
      <VQrCode
        :text="qrcode"
        class="h-36 w-36"
      />
      <span class="text-xs whitespace-nowrap text-gray-500 dark:text-gray-300">
        {{ text }}
      </span>
    </span>
  </span>
</template>
