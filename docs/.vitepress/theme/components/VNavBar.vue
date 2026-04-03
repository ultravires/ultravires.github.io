<script lang="ts" setup>
import '@docsearch/css';
import { useScroll } from '@vueuse/core';
import type { DefaultTheme } from 'vitepress';
import { useData } from 'vitepress';
import { defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import VIconSearch from '../assets/svg/search.svg?component';
import VIconTrain from '../assets/svg/train.svg?component';
import VBackTop from './VBackToTop.vue';
import VLogo from './VLogo.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VNavBarLink from './VNavBarLink.vue';
import VRandomArticle from './VRandomArticle.vue';
import VThemeToggle from './VThemeToggle.vue';

const VPAlgoliaSearchBox = __ALGOLIA__
  ? defineAsyncComponent(() => import('./VAlgoliaSearchBox.vue'))
  : () => null;

const { theme, frontmatter, page } = useData();
const loaded = ref(false);
const actuallyLoaded = ref(false);
const navBarRef = ref<HTMLElement | null>(null);
const { arrivedState } = useScroll(document);

const showTitle = useShowTitle();
function useShowTitle() {
  const showTitle = ref(false);
  const { y } = useScroll(document);
  watch(y, (lastY, currentY) => {
    if (currentY < lastY) {
      showTitle.value = true;
    } else {
      showTitle.value = false;
    }
  });
  return showTitle;
}

const preconnect = () => {
  const id = 'VPAlgoliaPreconnect';

  const rIC = window.requestIdleCallback || setTimeout;
  rIC(() => {
    const preconnect = document.createElement('link');
    preconnect.id = id;
    preconnect.rel = 'preconnect';
    preconnect.href = `https://${((theme.value.search?.options as DefaultTheme.AlgoliaSearchOptions) ?? theme.value.algolia)!.appId}-dsn.algolia.net`;
    preconnect.crossOrigin = '';
    document.head.appendChild(preconnect);
  });
};

onMounted(() => {
  if (!__ALGOLIA__) {
    return;
  }

  preconnect();

  const handleSearchHotKey = (event: KeyboardEvent) => {
    if (
      (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) ||
      (!isEditingContent(event) && event.key === '/')
    ) {
      event.preventDefault();
      load();
      remove();
    }
  };

  const remove = () => {
    window.removeEventListener('keydown', handleSearchHotKey);
  };

  window.addEventListener('keydown', handleSearchHotKey);

  onUnmounted(remove);
});

function load() {
  if (!loaded.value) {
    loaded.value = true;
    setTimeout(poll, 16);
  }
}

function poll() {
  // programmatically open the search box after initialize
  const e = new Event('keydown') as any;

  e.key = 'k';
  e.metaKey = true;

  window.dispatchEvent(e);

  setTimeout(() => {
    if (!document.querySelector('.DocSearch-Modal')) {
      poll();
    }
  }, 16);
}

function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement;
  const tagName = element.tagName;

  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  );
}

function handleSearch() {
  document.getElementById('docsearch')?.querySelector('button')?.click();
}

const provider = __ALGOLIA__ ? 'algolia' : __VP_LOCAL_SEARCH__ ? 'local' : '';
</script>

<template>
  <nav
    ref="navBarRef"
    class="VNavBar @container h-(--web-header-height) top-0 z-10 w-full backdrop-blur-sm [&.fixed]:h-[55px] [&.fixed]:text-black dark:[&.fixed]:text-white"
    :class="[
      frontmatter?.layout !== 'home' && frontmatter?.banner
        ? 'text-white'
        : 'text-normal',
      { fixed: !arrivedState.top }
    ]"
  >
    <div
      class="@8xl:max-w-[87.5rem] relative z-0 mx-auto flex h-full items-center justify-center gap-4 px-8 max-md:px-2"
    >
      <!-- Logo -->
      <VLogo />

      <!-- Nav -->
      <Transition name="slide-fade-reverse">
        <ul
          v-show="!showTitle"
          class="absolute -z-10 mx-auto flex h-full w-full items-center justify-center gap-4 max-md:hidden"
        >
          <li
            v-for="item in theme.nav"
            :key="item.text"
          >
            <VNavBarLink
              class="text-md tracking-8 decoration-none hover:bg-primary group relative whitespace-nowrap rounded-full leading-none hover:text-white dark:hover:text-black"
              :item="item"
            />
          </li>
          <li
            class="hover:text-reverse hover:bg-primary cursor-pointer rounded-full p-2 leading-none transition-all duration-300"
            @click="handleSearch"
          >
            <template v-if="provider === 'algolia'">
              <VPAlgoliaSearchBox
                v-if="loaded"
                :algolia="theme.search?.options ?? theme.algolia"
                @vue:beforeMount="actuallyLoaded = true"
              />
              <div
                v-if="!actuallyLoaded"
                id="docsearch"
              >
                <VIconSearch
                  title="搜索"
                  @click="load"
                />
              </div>
            </template>
          </li>
        </ul>
      </Transition>

      <Transition name="slide-fade">
        <div
          v-show="showTitle"
          class="absolute mx-auto font-bold"
        >
          {{ page.title || '向成渝 —— 专注于计算机科学与技术' }}
        </div>
      </Transition>

      <div class="ml-auto flex items-center space-x-4 max-md:ml-auto">
        <a
          class="hover:text-reverse hover:bg-primary cursor-pointer rounded-full p-1 text-xl transition-all duration-300"
          href="https://www.travellings.cn/go.html"
          target="__blank"
        >
          <VIconTrain />
        </a>
        <VRandomArticle />
        <VThemeToggle
          class="hover:text-reverse hover:bg-primary cursor-pointer rounded-full p-1 text-xl transition-all duration-300"
          :theme-config="{ dark: 'dark', light: 'light' }"
        />
        <VBackTop />
        <VNavBarHamburger class="hidden max-md:flex" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 液态毛玻璃效果 (Liquid Glass) */
.VNavBar.fixed {
  /* 基础边框和背景 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.3) !important;
  background: radial-gradient(
    circle at 20% 0%,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0.1) 100%
  ) !important;

  /* 核心毛玻璃：高模糊度 + 高饱和度 + 亮度微调 */
  backdrop-filter: blur(40px) saturate(210%) brightness(1.1) !important;
  -webkit-backdrop-filter: blur(40px) saturate(210%) brightness(1.1) !important;

  /* 阴影与内部反光 */
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.5) !important;
}

:global(.dark) .VNavBar.fixed {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: radial-gradient(
    circle at 20% 0%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.01) 100%
  ) !important;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.15) !important;
}

/* 物理噪点纹理：提升质感的关键 */
.VNavBar.fixed::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  z-index: -1;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  scale: 1.2;
  transform: translateY(100%);
  opacity: 0;
}

/* 反向 */
.slide-fade-reverse-enter-active,
.slide-fade-reverse-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-reverse-enter-from,
.slide-fade-reverse-leave-to {
  scale: 1.2;
  transform: translateY(-100%);
  opacity: 0;
}
</style>
