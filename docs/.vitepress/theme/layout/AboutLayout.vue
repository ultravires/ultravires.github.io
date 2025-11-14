<script setup>
import { Icon } from '@iconify/vue';
import PageContainer from '@theme/components/PageContainer.vue';
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { useData } from 'vitepress';

const { frontmatter } = useData();

const user = frontmatter.value?.self ?? {};
</script>

<template>
  <PageContainer>
    <!-- 基础信息 -->
    <div class="mb-4">
      <img
        :src="getAvatarUrl(user.email)"
        alt="Avatar"
        class="block h-16 w-16 rounded-full"
      />
      <div class="mt-6">
        <h2 class="my-4 text-4xl font-semibold">前端工程师</h2>
        <p class="text-gray-600">{{ user.bio }}</p>
      </div>
      <div class="mt-4">
        <a
          v-for="link in user.links"
          :href="link.link"
          target="_blank"
          class="inline-block text-gray-500 hover:text-gray-700"
        >
          <Icon
            :icon="link.icon"
            class="text-3xl"
          />
        </a>
      </div>
    </div>

    <section class="max-w-96 rounded-2xl bg-white p-4 shadow">
      <h3 class="flex items-center">
        <Icon
          icon="mdi:briefcase-variant-outline"
          class="text-2xl"
        />
        <span class="text-xl font-extrabold">工作经历</span>
      </h3>
      <div>
        <div
          v-for="work in user.works"
          class="flex w-full items-center gap-2 p-4"
        >
          <img
            class="h-12 w-12 rounded-full object-contain p-2 shadow"
            :src="work.logo"
          />
          <div class="flex-1">
            <p class="font-bold">{{ work.company }}</p>
            <div class="mb-2 flex justify-between">
              <span class="text-gray-600">{{ work.position }}</span>
              <span class="text-gray-400">{{ work.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageContainer>
</template>
