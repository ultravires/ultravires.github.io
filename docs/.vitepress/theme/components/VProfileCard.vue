<script setup>
import VIconGithub from '../assets/svg/github.svg?component';

const profile = {
  name: '向成渝',
  introduction:
    '热爱技术和写作',
  geyan: '完成比完美更重要',
  skill: '专注于计算机科学与技术',
};
</script>

<template>
  <div
    class="flex flex-col gap-4 justify-center items-center p-4 w-full bg-[var(--color-content-bg)] border border-solid border-line rounded-md"
  >
    <div class="px-2 py-1 bg-white/20 text-sm rounded-xl">
      {{ profile.geyan }}
    </div>
    <img class="rounded-full" src="https://0.gravatar.com/avatar/83ced4a3fc134e727c30cc30834f64a7183c65cebd81c9821260b0628e7ebad0?size=100" alt="博主头像" />
    <div class="w-full text-center">
      {{ profile.introduction }}
    </div>
    <div class="flex gap-4 justify-center items-center w-full">
      <div class="text-center">
        <div class="text-lg font-medium">{{ profile.name }}</div>
        <div class="text-sm">
          {{ profile.skill }}
        </div>
      </div>
    </div>
  </div>
</template>
