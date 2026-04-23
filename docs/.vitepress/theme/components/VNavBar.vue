<script lang="ts" setup>
import '@docsearch/css';
import { useScroll } from '@vueuse/core';
import type { DefaultTheme } from 'vitepress';
import { useData } from 'vitepress';
import { defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import VIconSearch from '../assets/svg/search.svg?component';
import VIconTrain from '../assets/svg/train.svg?component';
import LiquidClassCard from './LiquidClassCard.vue';
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
/** SSR 下无 document，避免在 setup 顶层直接引用全局 document */
const docScrollTarget = import.meta.env.SSR ? undefined : document;
const { arrivedState } = useScroll(docScrollTarget);

const showTitle = useShowTitle();
function useShowTitle() {
  const showTitle = ref(false);
  const { y } = useScroll(docScrollTarget);
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
    class="VNavBar @container h-(--web-header-height) top-0 z-10 w-full [&.fixed]:h-[55px] [&.fixed]:text-black dark:[&.fixed]:text-white"
    :class="[
      frontmatter?.layout !== 'home' && frontmatter?.banner
        ? 'text-white'
        : 'text-normal',
      { fixed: !arrivedState.top }
    ]"
  >
    <div
      class="relative z-0 mx-auto flex h-full items-center justify-center gap-4 px-8"
    >
      <!-- Logo -->
      <LiquidClassCard class="rounded-full">
        <div class="flex h-[40px] items-center justify-center pl-8 pr-4">
          <VLogo />
        </div>
      </LiquidClassCard>

      <!-- Nav -->
      <Transition name="slide-fade-reverse">
        <LiquidClassCard
          v-show="!showTitle"
          class="-z-10 mx-auto rounded-full max-md:hidden"
          style="position: absolute"
        >
          <ul
            class="flex h-[40px] w-full items-center justify-center gap-4 px-1"
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
        </LiquidClassCard>
      </Transition>

      <Transition name="slide-fade">
        <LiquidClassCard
          v-show="showTitle"
          class="rounded-full"
          style="position: absolute"
        >
          <div
            class="flex h-[40px] items-center justify-center px-4 font-bold leading-none"
          >
            {{ page.title || '向成渝 —— 专注于计算机科学与技术' }}
          </div>
        </LiquidClassCard>
      </Transition>

      <LiquidClassCard class="ml-auto rounded-full px-4">
        <div class="flex h-[40px] items-center gap-4">
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
      </LiquidClassCard>
    </div>
  </nav>
</template>

<style scoped>
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
