<script lang="ts" setup>
import { useScroll } from '@vueuse/core';
import { useData } from 'vitepress';
import { ref, watch } from 'vue';
import VIconSearch from '../assets/svg/search.svg?component';
import VIconTrain from '../assets/svg/train.svg?component';
import { useSearch } from '../composables/useSearch';
import LiquidClassCard from './LiquidClassCard.vue';
import VBackTop from './VBackToTop.vue';
import VLogo from './VLogo.vue';
import VNavBarHamburger from './VNavBarHamburger.vue';
import VNavBarLink from './VNavBarLink.vue';
import VRandomArticle from './VRandomArticle.vue';
import VThemeToggle from './VThemeToggle.vue';
import VTooltip from './VTooltip.vue';

const { theme, frontmatter, page } = useData();
const { open } = useSearch();
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
            <li>
              <VTooltip
                content="搜索"
                class="hover:text-reverse hover:bg-primary cursor-pointer rounded-full p-2 leading-none transition-all duration-300"
                @click="open()"
              >
                <VIconSearch />
              </VTooltip>
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
          <button
            class="hover:text-reverse hover:bg-primary hidden cursor-pointer rounded-full p-1 text-xl transition-all duration-300 max-md:block"
            @click="open()"
          >
            <VTooltip content="搜索">
              <VIconSearch />
            </VTooltip>
          </button>
          <VTooltip content="寻找宝藏博主">
            <a
              class="hover:text-reverse hover:bg-primary cursor-pointer rounded-full p-1 text-xl transition-all duration-300"
              href="https://www.travellings.cn/go.html"
              target="__blank"
            >
              <VIconTrain />
            </a>
          </VTooltip>
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
