<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue';
import { useData } from 'vitepress';
import VLogo from './VLogo.vue';
import VThemeToggle from './VThemeToggle.vue';
import VRandomArticle from './VRandomArticle.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VBackTop from './VBackToTop.vue';
import VNavBarLink from './VNavBarLink.vue';
import VIconSearch from './icons/VIconSearch.vue';
import '@docsearch/css';

const VPAlgoliaSearchBox = __ALGOLIA__
  ? defineAsyncComponent(() => import('./VAlgoliaSearchBox.vue'))
  : () => null;

const { theme, frontmatter } = useData();

const loaded = ref(false);

const actuallyLoaded = ref(false);

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
</script>

<template>
  <nav
    class="dark:bg-neutral-900 dark:bg-opacity-90 dark:border-neutral-700 VNavBar fixed w-full h-[var(--web-header-height)] bg-white bg-opacity-90 border-b border-solid border-neutral-200 backdrop-blur-sm transition-colors duration-300 top-0 z-10"
    :class="frontmatter?.layout !== 'home' && frontmatter?.banner ? 'text-white' : 'text-base'"
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
            class="hover:bg-primary hover:text-reverse group relative text-md tracking-8 decoration-none rounded-full whitespace-nowrap font-medium"
            :item="item"
          />
        </li>
        <li
          class="hover:bg-primary hover:text-reverse rounded-full p-2 cursor-pointer transition-colors duration-300"
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
      <div class="max-md:ml-auto flex items-center gap-4 ml-auto">
        <VRandomArticle />
        <VThemeToggle />
        <VBackTop />
        <VNavBarHamburger class="max-md:flex hidden ml-4" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.VNavBar {
  --web-main-header-bg: rgb(255 255 255 / var(--tw-bg-opacity));
  animation: background-transform auto linear 300ms;
  animation-timeline: --page-scroll;
}

.dark .VNavBar {
  --web-main-header-bg: rgb(23 23 23 / var(--tw-bg-opacity));
  --web-main-header-border: 1px solid #262626;
}

@keyframes background-transform {
  0% {
    background-color: transparent;
    border-bottom-width: 0;
    backdrop-filter: blur(0px);
  }
  .0001% {
    background-color: var(--web-main-header-bg);
    border-bottom-width: 1px;
    backdrop-filter: blur(10px);
    color: rgb(var(--web-color-base) / 1);
  }
  100% {
    background-color: var(--web-main-header-bg);
    border-bottom-width: 1px;
    backdrop-filter: blur(10px);
    color: rgb(var(--web-color-base) / 1);
  }
}
</style>
