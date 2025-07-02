<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
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
import { throttleAndDebounce } from '@theme/support/utils';

const VPAlgoliaSearchBox = __ALGOLIA__
  ? defineAsyncComponent(() => import('./VAlgoliaSearchBox.vue'))
  : () => null;

const { theme, frontmatter } = useData();
const loaded = ref(false);
const actuallyLoaded = ref(false);
const navBarRef = ref<HTMLElement | null>(null);

const preconnect = () => {
  const id = 'VPAlgoliaPreconnect';

  const rIC = window.requestIdleCallback || setTimeout;
  rIC(() => {
    const preconnect = document.createElement('link');
    preconnect.id = id;
    preconnect.rel = 'preconnect';
    preconnect.href = `https://${
      ((theme.value.search?.options as DefaultTheme.AlgoliaSearchOptions) ??
        theme.value.algolia)!.appId
    }-dsn.algolia.net`;
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

const handleScroll = throttleAndDebounce(() => {
  if (document.documentElement.scrollTop > 0) {
    navBarRef.value?.classList.add('fixed');
  } else {
    navBarRef.value?.classList.remove('fixed');
  }
}, 500);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav
    ref="navBarRef"
    class="VNavBar @container dark:[&.fixed]:bg-black/90 dark:[&.fixed]:text-white [&.fixed]:bg-white/90 [&.fixed]:text-black [&.fixed]:border-b [&.fixed]:border-line/90 w-full h-[var(--web-header-height)] [&.fixed]:h-[50px] backdrop-blur-sm top-0 z-10 transition-[height] duration-500"
    :class="
      frontmatter?.layout !== 'home' && frontmatter?.banner
        ? 'text-white'
        : 'text-normal'
    "
  >
    <div
      class="@8xl:max-w-[87.5rem] max-md:px-2 px-8 relative flex justify-center items-center gap-4 mx-auto h-full z-0"
    >
      <VLogo />
      <ul
        class="max-md:hidden absolute flex gap-4 justify-center items-center mx-auto w-full h-full -z-10"
      >
        <li v-for="item in theme.nav" :key="item.text">
          <VNavBarLink
            class="group relative text-md tracking-8 leading-none decoration-none rounded-full whitespace-nowrap font-AlibabaPuHuiTiBold hover:bg-primary hover:text-white dark:hover:text-black"
            :item="item"
          />
        </li>
        <li
          class="hover:bg-primary hover:text-reverse rounded-full p-2 leading-none cursor-pointer transition-all duration-300"
          @click="handleSearch"
        >
          <template v-if="provider === 'algolia'">
            <VPAlgoliaSearchBox
              v-if="loaded"
              :algolia="theme.search?.options ?? theme.algolia"
              @vue:beforeMount="actuallyLoaded = true"
            />
            <div v-if="!actuallyLoaded" id="docsearch">
              <VIconSearch title="搜索" @click="load" />
            </div>
          </template>
        </li>
      </ul>
      <div class="max-md:ml-auto flex items-center ml-auto">
        <VRandomArticle />
        <VThemeToggle class="hover:bg-primary hover:text-reverse p-1 ml-4 text-xl rounded-full cursor-pointer transition-all duration-300" :theme-config="{ dark: 'dark', light: 'light' }" />
        <VBackTop class="ml-4" />
        <VNavBarHamburger class="max-md:flex hidden ml-4" />
      </div>
    </div>
  </nav>
</template>
