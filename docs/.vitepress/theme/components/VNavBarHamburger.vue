<script setup>
import { useMediaQuery, useScroll, useScrollLock } from '@vueuse/core';
import { useData, useRouter } from 'vitepress';
import { computed, onUnmounted, ref, watch } from 'vue';
import VNavBarLink from './VNavBarLink.vue';

const { theme } = useData();
const router = useRouter();
const isShow = ref(false);

const toggleMenu = () => {
  isShow.value = !isShow.value;
};

/** SSR 下无 document，避免在 setup 顶层直接引用全局 document */
const docScrollTarget = import.meta.env.SSR ? undefined : document;
const { arrivedState } = useScroll(docScrollTarget);

/** 菜单顶部对齐头部下缘：页面顶部时头部高 4rem，滚动后 .fixed 态收缩为 55px */
const menuTop = computed(() =>
  arrivedState.top ? 'var(--web-header-height)' : '55px'
);

/** 菜单打开期间锁定背景滚动 */
const scrollLockTarget = import.meta.env.SSR ? undefined : document.body;
const isLocked = useScrollLock(scrollLockTarget);
watch(isShow, (show) => {
  isLocked.value = show;
});
onUnmounted(() => {
  isLocked.value = false;
});

/** 路由跳转后自动关闭菜单 */
router.onAfterRouteChanged = () => {
  isShow.value = false;
};

/** 视口变宽越过移动端断点后自动关闭菜单 */
const isDesktop = useMediaQuery('(min-width: 768px)');
watch(isDesktop, (desktop) => {
  if (desktop) isShow.value = false;
});
</script>

<template>
  <div class="flex items-center">
    <button
      id="data-menu-toggle"
      :class="['data-menu-toggle', { active: isShow }]"
      @click="toggleMenu"
    >
      <span class="menu-bar bar"></span>
    </button>
    <!-- 菜单层级必须高于 header（z-10）：SSR 下 teleport 锚点位于 #app 之前，
         客户端插入的菜单在 DOM 顺序上先于 header，z-index 相同时会被 Banner 遮挡 -->
    <Teleport to="body">
      <Transition name="nav-menu">
        <div
          v-if="isShow"
          class="text-normal border-line fixed bottom-0 left-0 right-0 z-20 overflow-y-auto border-t border-solid bg-white dark:bg-neutral-900"
          :style="{ top: menuTop }"
        >
          <ul class="mx-6 py-6 sm:mx-12 sm:py-12">
            <template
              v-for="item in theme.nav"
              :key="item.text"
            >
              <!-- 分组项：触屏无 hover，子项内联展开 -->
              <li v-if="item.items && item.items.length > 0">
                <div class="py-2 text-sm opacity-60">{{ item.text }}</div>
                <ul>
                  <li
                    v-for="child in item.items"
                    :key="child.text"
                  >
                    <VNavBarLink
                      class="border-line block h-full border-b border-solid py-2 pl-4"
                      :item="child"
                      @click="isShow = false"
                    />
                  </li>
                </ul>
              </li>
              <li v-else>
                <VNavBarLink
                  class="border-line block h-full border-b border-solid py-2"
                  :item="item"
                  @click="isShow = false"
                />
              </li>
            </template>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.data-menu-toggle {
  position: relative;
  width: 16px;
  height: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
/* 初始化样式 */
.data-menu-toggle .menu-bar,
.data-menu-toggle .menu-bar:before,
.data-menu-toggle .menu-bar:after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all ease-in-out 0.3s;
}
.data-menu-toggle .menu-bar.bar {
  top: 6px;
}
.data-menu-toggle .menu-bar.bar::before {
  content: '';
  width: 80%;
  top: -6px;
  right: 0;
}
.data-menu-toggle .menu-bar.bar::after {
  content: '';
  width: 80%;
  top: 6px;
  right: 0;
}

/* 悬浮样式 */
.data-menu-toggle:hover .menu-bar.bar::before,
.data-menu-toggle:hover .menu-bar.bar::after {
  width: 120%;
}

/* 激活样式 */
.data-menu-toggle.active .bar {
  background-color: transparent;
}
.data-menu-toggle.active .bar::before {
  width: 100%;
  top: 0px;
  transform: rotate(405deg);
}
.data-menu-toggle.active .bar::after {
  width: 100%;
  top: 0px;
  transform: rotate(-45deg);
}

/* 菜单面板过渡 */
.nav-menu-enter-active,
.nav-menu-leave-active {
  transition:
    opacity 0.3s ease-out,
    translate 0.3s ease-out;
}

.nav-menu-enter-from,
.nav-menu-leave-to {
  opacity: 0;
  translate: 0 -8px;
}
</style>
