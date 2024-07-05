<script setup>
import { withBase } from 'vitepress';

defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="group-hover/post-card:scale-105 dark:bg-neutral-800 relative flex justify-center items-center w-full h-full bg-slate-700 transition-transform duration-300"
  >
    <img
      v-if="post.cover"
      class="absolute min-w-24 w-auto h-auto bg-transparent border-0 outline-0 object-contain drop-shadow-[0_25px_25px_rgb(0_0_0_/_1)] z-10"
      :src="
        withBase(
          typeof post.cover === 'string' ? post.cover : post.cover.url || ''
        )
      "
      loading="lazy"
    />
    <div v-else class="text-white text-6xl font-black tracking-wider">
      暂无封面
    </div>

    <div
      v-if="typeof post.cover === 'object' && post.cover.text"
      class="absolute flex justify-center items-center gap-14 w-full h-full whitespace-nowrap z-0"
    >
      <span
        v-for="item in post.cover.text.split('|')"
        :key="item"
        class="text-white text-6xl font-black tracking-wider drop-shadow-2xl"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>
