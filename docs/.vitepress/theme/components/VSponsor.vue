<script lang="ts" setup>
import { withBase } from 'vitepress';
import VIconHandHeart from '../assets/svg/handheart.svg?component';
</script>

<template>
  <div class="relative">
    <div
      class="peer relative flex cursor-pointer items-center justify-center rounded-md bg-red-600 px-6 py-2 text-white transition-all duration-300 hover:bg-red-500 hover:drop-shadow-[0_0_6px_rgba(250,0,0,.6)]"
    >
      <VIconHandHeart class="mr-2 text-lg" />
      <span>鼓励作者</span>
    </div>
    <div
      class="pointer-events-none absolute bottom-full left-1/2 z-10 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 peer-hover:pointer-events-auto peer-hover:block peer-hover:translate-y-0 peer-hover:opacity-100 hover:pointer-events-auto hover:block hover:translate-y-0 hover:opacity-100"
    >
      <div
        class="mb-4 w-max rounded-lg border border-solid border-line bg-white p-5 sm:p-8 dark:bg-neutral-900"
      >
        <p
          class="mb-2 text-center text-lg font-medium whitespace-nowrap text-red-500"
        >
          感谢你赐予我前进的动力！
        </p>
        <div class="flex gap-3 sm:gap-4">
          <div class="flex flex-col justify-center">
            <img
              class="h-32 w-32 rounded-sm object-contain sm:h-40 sm:w-40"
              :src="withBase('/WeChatPay.jpg')"
            />
            <div class="text-center">微信</div>
          </div>
          <div class="flex flex-col justify-center">
            <img
              class="h-32 w-32 rounded-sm object-contain sm:h-40 sm:w-40"
              :src="withBase('/AliPay.jpg')"
            />
            <div class="text-center">支付宝</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
