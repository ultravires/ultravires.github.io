<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VIconMoon from './icons/VIconMoon.vue';
import VIconSun from './icons/VIconSun.vue';

const isDarkTheme = ref(false);

const toggleTheme = () => {
  const root = document.documentElement;
  root.classList.toggle('dark');
  isDarkTheme.value = root.classList.contains('dark');
  window.localStorage.setItem('isDark', `${isDarkTheme.value}`);
};

onMounted(() => {
  const root = document.documentElement;
  const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");

  if (window.localStorage.getItem('isDark') === 'true') {
    isDarkTheme.value = true;
    root.classList.add('dark');
  } else if (window.localStorage.getItem('isDark') === 'false') {
    isDarkTheme.value = false;
    root.classList.remove('dark');
  } else {
    isDarkTheme.value = themeMedia.matches;
    themeMedia.addEventListener('change', (e) => {
      isDarkTheme.value = e.matches;
    });
  }
});
</script>

<template>
  <div class="cursor-pointer" @click="toggleTheme">
    <VIconMoon title="进入暗色主题" v-show="!isDarkTheme" />
    <VIconSun title="进入亮色主题" v-show="isDarkTheme"/>
  </div>
</template>