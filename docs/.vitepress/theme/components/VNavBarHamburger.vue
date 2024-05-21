<script setup>
import { useData } from 'vitepress';
import VNavBarLink from './VNavBarLink.vue';
import { ref } from 'vue';

const { theme } = useData();
const isShow = ref(false);

const toggleMenu = (event) => {
  event.currentTarget.classList.toggle('active');
  isShow.value = !isShow.value;
};
</script>

<template>
  <div class="flex items-center">
    <button id="data-menu-toggle" class="data-menu-toggle" @click="toggleMenu">
      <span class="menu-bar bar"></span>
    </button>
    <div v-if="isShow" class="container fixed top-[calc(60px+1px)] mx-auto left-0 right-0 bottom-0 z-10 bg-neutral-900">
      <ul class="mx-12 py-12">
        <li v-for="item in theme.nav" :key="item.text" class="border-b border-solid leading-loose py-2">
          <VNavBarLink :item="item" />
        </li>
      </ul>
    </div>
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
.data-menu-toggle .menu-bar:after{
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: rgba(var(--web-color-white) / 1);
  transition: all ease-in-out .3s;
}
.data-menu-toggle .menu-bar.bar {
  top: 6px;
}
.data-menu-toggle .menu-bar.bar:before {
  content: "";
  top: -6px;
}
.data-menu-toggle .menu-bar.bar:after {
  content: "";
  top: 6px;
}
/* 激活样式 */
.data-menu-toggle.active .bar {
  background-color: transparent;
}
.data-menu-toggle.active .bar:before {
  top: 0px;
  transform: rotate(405deg);
}
.data-menu-toggle.active .bar:after {
  top: 0px;
  transform: rotate(-45deg);
}
</style>