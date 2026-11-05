<script setup lang="ts">
import VIconGithub from '../assets/svg/github.svg?component';
import { ref } from 'vue';
import { getAvatarUrl } from '@theme/composables/useGravatar';

const profile = {
  name: '向成渝',
  email: 'x555666777@qq.com',
  introduction: '热爱技术和写作',
  geyan: '完成比完美更重要',
  skill: '专注于计算机科学与技术'
};

const avatarUrl = ref(getAvatarUrl(profile.email));
</script>

<template>
  <div
    class="flex w-full flex-col items-center justify-center gap-4 rounded-md border border-solid border-line bg-[var(--color-content-bg)] p-4"
  >
    <div class="rounded-xl bg-white/20 px-2 py-1 text-sm">
      {{ profile.geyan }}
    </div>
    <img
      class="rounded-full"
      :src="avatarUrl"
      alt="博主头像"
    />
    <div class="w-full text-center">
      {{ profile.introduction }}
    </div>
    <div class="flex w-full items-center justify-center gap-4">
      <div class="text-center">
        <div class="text-lg font-medium">{{ profile.name }}</div>
        <div class="text-sm">
          {{ profile.skill }}
        </div>
      </div>
    </div>
  </div>
</template>
