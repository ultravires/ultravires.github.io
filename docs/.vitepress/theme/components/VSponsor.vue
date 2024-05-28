<script lang="ts" setup>
import VIconHandHeart from './icons/VIconHandHeart.vue';
</script>

<template>
  <div class="hover:bg-red-500 hover:drop-shadow-[0_0_6px_rgba(250,0,0,.6)] group relative flex justify-center items-center bg-red-600 text-white px-6 py-2 rounded-md cursor-pointer transition-colors duration-300">
    <VIconHandHeart class="mr-2 text-lg" />
    <span>鼓励作者</span>
  </div>
</template>