<script setup>
import { Icon } from '@iconify/vue';
import PageContainer from '@theme/components/PageContainer.vue';
import VAvatar from '@theme/components/VAvatar.vue';
import VQrCodePopover from '@theme/components/VQrCodePopover.vue';
import { Content, useData } from 'vitepress';

const { frontmatter } = useData();

const user = frontmatter.value?.self ?? {};
</script>

<template>
  <PageContainer>
    <!-- 基础信息 -->
    <div class="mb-4">
      <div class="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <VAvatar
          :size="96"
          class="shrink-0"
        />
        <div class="text-center sm:text-left">
          <h2 class="my-4 text-4xl font-semibold">{{ user.name }}</h2>
          <p class="text-gray-600 dark:text-gray-200">{{ user.bio }}</p>
          <div class="mt-4 flex items-center justify-center gap-3 sm:justify-start">
            <template
              v-for="link in user.links"
              :key="link.text"
            >
              <VQrCodePopover
                v-if="link.qrcode"
                :icon="link.icon"
                :qrcode="link.qrcode"
                :text="link.text"
              />
              <a
                v-else
                :href="link.link"
                target="_blank"
                class="text-gray-600 hover:text-black dark:text-gray-200 dark:hover:text-white"
              >
                <Icon
                  :icon="link.icon"
                  class="text-3xl"
                />
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 flex w-full flex-col gap-4 lg:flex-row">
      <div
        id="about-content"
        class="flex-1"
      >
        <Content class="prose dark:prose-invert max-w-none" />
      </div>

      <div class="flex w-full shrink-0 flex-col gap-4 lg:w-96">
        <!-- 工作经历 -->
        <div class="rounded-2xl border border-neutral-100/10 bg-white p-4 shadow dark:bg-neutral-700">
          <h3 class="flex items-center gap-2">
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
                class="h-12 w-12 rounded-full border border-neutral-100/20 bg-white object-contain p-2 shadow"
                :src="work.logo"
              />
              <div class="flex-1">
                <p class="font-bold">{{ work.company }}</p>
                <div class="mb-2 flex flex-wrap justify-between gap-x-2">
                  <span class="text-gray-600 dark:text-gray-200">
                    {{ work.position }}
                  </span>
                  <span class="shrink-0 text-gray-400">{{ work.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 性格特质 -->
        <div
          v-if="user.personalities?.length"
          class="rounded-2xl border border-neutral-100/10 bg-white p-4 shadow dark:bg-neutral-700"
        >
          <h3 class="flex items-center gap-2">
            <Icon
              icon="mdi:brain"
              class="text-2xl"
            />
            <span class="text-xl font-extrabold">性格特质</span>
          </h3>
          <div class="mt-3 flex flex-col gap-3">
            <div
              v-for="p in user.personalities"
              :key="p.text"
              class="border-line rounded-xl border border-solid p-3"
            >
              <div class="flex items-center gap-2">
                <span class="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold">
                  {{ p.flag }}
                </span>
                <span class="font-bold">{{ p.text }}</span>
              </div>
              <p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {{ p.desc }}
              </p>
              <a
                :href="p.link"
                target="_blank"
                rel="noopener"
                class="text-primary mt-2 inline-flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-80"
              >
                了解性格类型
                <Icon
                  icon="mdi:arrow-top-right"
                  class="text-base"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<style>
/* 去除正文首段的上边距，让正文首行与右侧卡片顶部对齐。
   @tailwindcss/typography 会给首段加 margin-top:1.25em，
   而 VitePress 在 markdown 外又包了一层 div，导致其
   `.prose > :first-child` 的首元素归零规则失效。 */
#about-content .prose > div > :first-child {
  margin-top: 0;
}
</style>
