<script setup>
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { useData } from 'vitepress';

const { frontmatter } = useData();

const user = frontmatter.value?.self ?? {};
</script>

<template>
  <div>
    <div class="container mx-auto p-4">
      <h1 class="mb-4 text-center text-2xl font-bold">关于我</h1>

      <!-- 基础信息 -->
      <div class="mb-4 flex items-center">
        <img
          :src="getAvatarUrl(user.email)"
          alt="Avatar"
          class="mr-4 h-16 w-16 rounded-full"
        />
        <div>
          <h2 class="text-xl font-semibold">{{ user.name }}</h2>
          <p class="text-gray-600">{{ user.bio }}</p>
        </div>
      </div>

      <section>
        <h3>工作经历</h3>
        <div>
          <div class="mb-2">
            <span class="font-semibold">中宏立达</span>
            <span class="ml-2">2018.9 - 2025.7</span>
          </div>
          <p class="text-gray-600">前端工程师</p>
        </div>
      </section>
    </div>
  </div>
</template>
