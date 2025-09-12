<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import VLogo from './VLogo.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VBackTop from './VBackToTop.vue';
import VNavBarLink from './VNavBarLink.vue';
import VIconSearch from '../assets/svg/search.svg?component';
import '@docsearch/css';
import type { DefaultTheme } from 'vitepress';
import { useScroll } from '@vueuse/core';

const VPAlgoliaSearchBox = __ALGOLIA__ ? defineAsyncComponent(() => import('./VAlgoliaSearchBox.vue')) : () => null;

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
    if ((event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) || (!isEditingContent(event) && event.key === '/')) {
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

  return element.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA';
}

function handleSearch() {
  document.getElementById('docsearch')?.querySelector('button')?.click();
}

const provider = __ALGOLIA__ ? 'algolia' : __VP_LOCAL_SEARCH__ ? 'local' : '';
</script>

<template>
  <nav
    ref="navBarRef"
    class="VNavBar @container top-0 z-10 h-[var(--web-header-height)] w-full backdrop-blur-sm transition-[height] duration-500 [&.fixed]:h-[55px] [&.fixed]:border-b [&.fixed]:border-line/90 [&.fixed]:bg-white/90 [&.fixed]:text-black dark:[&.fixed]:bg-black/90 dark:[&.fixed]:text-white"
    :class="[frontmatter?.layout !== 'home' && frontmatter?.banner ? 'text-white' : 'text-normal', { fixed: !arrivedState.top }]"
  >
    <div class="@8xl:max-w-[87.5rem] relative z-0 mx-auto flex h-full items-center justify-center gap-4 px-8 max-md:px-2">
      <!-- Logo -->
      <VLogo />

      <!-- Nav -->
      <Transition name="slide-fade-reverse">
        <ul v-show="!showTitle" class="absolute -z-10 mx-auto flex h-full w-full items-center justify-center gap-4 max-md:hidden">
          <li v-for="item in theme.nav" :key="item.text">
            <VNavBarLink
              class="group text-md tracking-8 decoration-none relative rounded-full font-AlibabaPuHuiTiBold leading-none whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-black"
              :item="item"
            />
          </li>
          <li
            class="hover:text-reverse cursor-pointer rounded-full p-2 leading-none transition-all duration-300 hover:bg-primary"
            @click="handleSearch"
          >
            <template v-if="provider === 'algolia'">
              <VPAlgoliaSearchBox v-if="loaded" :algolia="theme.search?.options ?? theme.algolia" @vue:beforeMount="actuallyLoaded = true" />
              <div v-if="!actuallyLoaded" id="docsearch">
                <VIconSearch title="搜索" @click="load" />
              </div>
            </template>
          </li>
        </ul>
      </Transition>

      <Transition name="slide-fade">
        <div v-show="showTitle" class="absolute mx-auto font-bold">{{ page.title || '向成渝 —— 专注于计算机科学与技术' }}</div>
      </Transition>

      <div class="ml-auto flex items-center max-md:ml-auto">
        <VRandomArticle />
        <VThemeToggle
          class="hover:text-reverse ml-4 cursor-pointer rounded-full p-1 text-xl transition-all duration-300 hover:bg-primary"
          :theme-config="{ dark: 'dark', light: 'light' }"
        />
        <VBackTop class="ml-4" />
        <VNavBarHamburger class="ml-4 hidden max-md:flex" />
      </div>
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
