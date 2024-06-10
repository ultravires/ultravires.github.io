<script lang="ts" setup>
import { withBase } from 'vitepress';
import VIconHandHeart from './icons/VIconHandHeart.vue';
</script>

<template>
  <div class="relative">
    <div class="hover:bg-red-500 hover:drop-shadow-[0_0_6px_rgba(250,0,0,.6)] peer relative flex justify-center items-center bg-red-600 text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-300">
      <VIconHandHeart class="mr-2 text-lg" />
      <span>鼓励作者</span>
    </div>
    <div class="peer-hover:block peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto hover:block hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto absolute bottom-full opacity-0 translate-y-4 pointer-events-none left-1/2 -translate-x-1/2 z-10 transition-all duration-300">
      <div class="dark:bg-neutral-900 dark:border-neutral-600 p-8 mb-4 w-max bg-white border border-solid border-neutral-200 rounded-lg ">
        <p class="mb-2 whitespace-nowrap text-center text-red-500 text-lg font-medium">感谢你赐予我前进的动力！</p>
        <div class="flex gap-4">
          <div class="flex flex-col justify-center">
            <img class="w-40 h-40 object-contain" :src="withBase('/WeChatPay.jpg')" />
            <div class="text-center">微信</div>
          </div>
          <div class="flex flex-col justify-center">
            <img class="w-40 h-40 object-contain" :src="withBase('/AliPay.jpg')" />
            <div class="text-center">支付宝</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>