<script setup>
import { Icon } from '@iconify/vue';
import PageContainer from '@theme/components/PageContainer.vue';
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { Content, useData } from 'vitepress';

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
        class="block h-16 w-16 rounded-full shadow"
      />
      <div class="mt-6">
        <h2 class="my-4 text-4xl font-semibold">前端工程师</h2>
        <p class="text-gray-600 dark:text-gray-200">{{ user.bio }}</p>
      </div>
      <div class="mt-4">
        <a
          v-for="link in user.links"
          :href="link.link"
          target="_blank"
          class="inline-block text-gray-600 hover:text-black dark:text-gray-200 dark:hover:text-white"
        >
          <Icon
            :icon="link.icon"
            class="text-3xl"
          />
        </a>
      </div>
    </div>

    <div class="mt-12 flex w-full gap-4">
      <div class="flex-1">
        <Content class="prose max-w-none dark:prose-invert" />
      </div>

      <div
        class="w-96 shrink-0 rounded-2xl border border-neutral-100/10 bg-white p-4 shadow dark:bg-neutral-700"
      >
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
              class="h-12 w-12 rounded-full bg-white border border-neutral-100/20 object-contain p-2 shadow"
              :src="work.logo"
            />
            <div class="flex-1">
              <p class="font-bold">{{ work.company }}</p>
              <div class="mb-2 flex justify-between">
                <span class="text-gray-600 dark:text-gray-200">{{ work.position }}</span>
                <span class="text-gray-400">{{ work.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>
