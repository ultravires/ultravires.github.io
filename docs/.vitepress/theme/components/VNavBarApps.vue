<script lang="ts" setup>
import VIconApps from '../assets/svg/apps.svg?component';
import VNavBarDropdown from './VNavBarDropdown.vue';

interface AppItem {
  /** 应用名称 */
  name: string;
  /** 应用链接 */
  link: string;
  /** 一句话描述 */
  desc: string;
  /** 图标（emoji） */
  icon: string;
}

// 我的应用列表，新增应用时在数组顶部追加一条记录
const apps: AppItem[] = [
  {
    name: '航图',
    desc: '精选网址导航',
    link: 'https://nav.imarkr.com/',
    icon: '🧭'
  }
];
</script>

<template>
  <VNavBarDropdown align="left">
    <template #trigger>
      <button
        class="hover:bg-primary cursor-pointer rounded-full p-1 text-xl leading-none transition-all duration-300 hover:text-white dark:hover:text-black"
        aria-label="我的应用"
      >
        <VIconApps />
      </button>
    </template>
    <div
      class="border-primary flex cursor-default flex-col gap-1 rounded-2xl border border-solid bg-white p-2 text-black shadow-lg dark:bg-neutral-900 dark:text-white"
    >
      <div class="px-3 pb-1 pt-2 text-xs opacity-60">我的应用</div>
      <a
        v-for="app in apps"
        :key="app.name"
        class="decoration-none hover:bg-primary flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-300 hover:text-white dark:hover:text-black"
        :href="app.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="text-2xl leading-none">{{ app.icon }}</span>
        <span class="flex flex-col">
          <span class="text-sm font-bold leading-tight">{{ app.name }}</span>
          <span class="text-xs leading-tight opacity-70">{{ app.desc }}</span>
        </span>
      </a>
    </div>
  </VNavBarDropdown>
</template>
