<script setup>
import { useData } from 'vitepress';
import VNavBarLink from './VNavBarLink.vue';
import { ref, watch } from 'vue';

const { theme } = useData();
const isShow = ref(false);
const toggleRef = ref(null);

const toggleMenu = () => {
  isShow.value = !isShow.value;
};

watch(isShow, (value) => {
  if (value) {
    toggleRef.value.classList.add('active');
  } else {
    toggleRef.value.classList.remove('active');
  }
});
</script>

<template>
  <div class="flex items-center">
    <button ref="toggleRef" id="data-menu-toggle" class="data-menu-toggle" @click="toggleMenu">
      <span class="menu-bar bar"></span>
    </button>
    <div v-if="isShow" class="dark:border-neutral-700 dark:bg-neutral-900 container fixed mx-auto bg-white border-t border-solid border-neutral-200 top-[calc(60px+1px)]  left-0 right-0 bottom-0 z-10">
      <nav class="mx-12 py-12">
        <template v-for="item in theme.nav" :key="item.text">
          <VNavBarLink class="dark:border-neutral-700 block py-2 h-full border-b border-solid border-neutral-200" :item="item" @click="isShow = false" />
        </template>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.dark .data-menu-toggle {
  --web-toggle-menu-color: var(--web-color-white);
}

.data-menu-toggle {
  --web-toggle-menu-color: var(--web-color-black);
}

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
.data-menu-toggle .menu-bar:after{
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: rgba(var(--web-toggle-menu-color) / 1);
  transition: all ease-in-out .3s;
}
.data-menu-toggle .menu-bar.bar {
  top: 6px;
}
.data-menu-toggle .menu-bar.bar:before {
  content: "";
  width: 80%;
  top: -6px;
  right: 0;
}
.data-menu-toggle .menu-bar.bar:after {
  content: "";
  width: 80%;
  top: 6px;
  right: 0;
}
/* 激活样式 */
.data-menu-toggle.active .bar {
  background-color: transparent;
}
.data-menu-toggle.active .bar:before {
  width: 100%;
  top: 0px;
  transform: rotate(405deg);
}
.data-menu-toggle.active .bar:after {
  width: 100%;
  top: 0px;
  transform: rotate(-45deg);
}
</style>