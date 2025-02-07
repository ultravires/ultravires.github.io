<script setup>
import VIconGithub from '../assets/svg/github.svg?component';

const profile = {
  name: '向成渝',
  introduction:
    '我也不知道怎么介绍自己！前端天花板，男，长得还可以。喜欢捣鼓技术，什么都略知一二。',
  geyan: '完成比完美更重要',
  skill: '专注于计算机科学与技术',
};
</script>

<template>
  <div
    class="flex flex-col gap-4 justify-center items-center p-4 w-full bg-[var(--color-primary)] border border-solid rounded-md"
  >
    <div class="px-2 py-1 bg-white/20 text-white text-sm rounded-xl">
      {{ profile.geyan }}
    </div>
    <div class="w-full text-white">
      <p>
        {{ profile.introduction }}
      </p>
    </div>
    <div class="flex gap-4 items-center w-full">
      <div>
        <div class="text-white text-lg font-medium">{{ profile.name }}</div>
        <div class="text-white/70 text-sm">
          {{ profile.skill }}
        </div>
      </div>
      <div>
        <a
          class="hover:bg-white/90 hover:scale-110 hover:text-blue-800 inline-flex justify-center items-center p-2 bg-white/20 text-white text-2xl rounded-full transition-all origin-center"
          href="https://github.com/ultravires"
          target="_blank"
        >
          <VIconGithub />
        </a>
      </div>
    </div>
  </div>
</template>
