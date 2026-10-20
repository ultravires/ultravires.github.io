<script lang="ts" setup>
import { withBase } from 'vitepress';
import VIconApps from '../assets/svg/apps.svg?component';
import VNavBarDropdown from './VNavBarDropdown.vue';

interface AppItem {
  /** 应用名称 */
  name: string;
  /** 应用链接 */
  link: string;
  /** 一句话描述 */
  desc: string;
  /** 图标（emoji），与 image 二选一 */
  icon?: string;
  /** 图标（public 目录下的图片路径），优先于 icon */
  image?: string;
}

interface AppSection {
  /** 分组标题 */
  title: string;
  apps: AppItem[];
}

// 应用列表按分组展示，新增应用时在对应分组数组顶部追加一条记录
const sections: AppSection[] = [
  {
    title: 'App Store',
    apps: [
      {
        name: 'Realtime Subtitle',
        desc: 'macOS 实时字幕工具',
        link: 'https://apps.apple.com/cn/app/realtime-subtitle/id6814721341?mt=12',
        image: '/apps/realtime-subtitle.png'
      },
      {
        name: 'ZoneBar',
        desc: '菜单栏日历和多时区时间',
        link: 'https://apps.apple.com/cn/app/zonebar-%E8%8F%9C%E5%8D%95%E6%A0%8F%E6%97%A5%E5%8E%86%E5%92%8C%E5%A4%9A%E6%97%B6%E5%8C%BA%E6%97%B6%E9%97%B4/id6787395500?mt=12',
        image: '/apps/zonebar.png'
      },
      {
        name: 'Fast2FA',
        desc: '2FA 两步验证工具',
        link: 'https://apps.apple.com/cn/app/fast2fa-authenticator/id6762446272?mt=12',
        image: '/apps/fast2fa.png'
      }
    ]
  },
  {
    title: '我的应用',
    apps: [
      {
        name: '航图',
        desc: '精选网址导航',
        link: 'https://nav.imarkr.com/',
        image: '/apps/hangtu.svg'
      }
    ]
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
      <template
        v-for="(section, index) in sections"
        :key="section.title"
      >
        <div
          class="px-3 pb-1 pt-2 text-xs opacity-60"
          :class="{ 'border-primary mt-1 border-t border-solid': index > 0 }"
        >
          {{ section.title }}
        </div>
        <a
          v-for="app in section.apps"
          :key="app.name"
          class="decoration-none hover:bg-primary flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-300 hover:text-white dark:hover:text-black"
          :href="app.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            v-if="app.image"
            class="size-7 leading-none"
            :src="withBase(app.image)"
            :alt="app.name"
          />
          <span
            v-else
            class="text-2xl leading-none"
            >{{ app.icon }}</span
          >
          <span class="flex flex-col">
            <span class="text-sm font-bold leading-tight">{{ app.name }}</span>
            <span class="text-xs leading-tight opacity-70">{{ app.desc }}</span>
          </span>
        </a>
      </template>
    </div>
  </VNavBarDropdown>
</template>
