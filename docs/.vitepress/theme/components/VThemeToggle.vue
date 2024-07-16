<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import VIconMoon from './icons/VIconMoon.vue';
import VIconSun from './icons/VIconSun.vue';

const isDarkTheme = ref(false);

const ThemeConfig = {
  THEME_CLASS_DARK: 'dark',
  THEME_CLASS_LIGHT: 'light',
};

const toggleTheme = () => {
  const root = document.documentElement;
  root.classList.toggle(ThemeConfig.THEME_CLASS_DARK);
  isDarkTheme.value = root.classList.contains(ThemeConfig.THEME_CLASS_DARK);
  root.dataset.theme = isDarkTheme.value
    ? ThemeConfig.THEME_CLASS_DARK
    : ThemeConfig.THEME_CLASS_LIGHT;
  window.localStorage.setItem('isDark', `${isDarkTheme.value}`);
};

onMounted(() => {
  const root = document.documentElement;
  const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  if (window.localStorage.getItem('isDark') === 'true') {
    isDarkTheme.value = true;
    root.classList.add(ThemeConfig.THEME_CLASS_DARK);
    root.dataset.theme = ThemeConfig.THEME_CLASS_DARK;
  } else if (window.localStorage.getItem('isDark') === 'false') {
    isDarkTheme.value = false;
    root.classList.remove(ThemeConfig.THEME_CLASS_DARK);
    root.dataset.theme = ThemeConfig.THEME_CLASS_LIGHT;
  } else {
    isDarkTheme.value = themeMedia.matches;
    themeMedia.addEventListener('change', (e) => {
      isDarkTheme.value = e.matches;
    });
  }
});
</script>

<template>
  <div
    class="hover:bg-primary hover:text-reverse p-1 text-xl rounded-full cursor-pointer transition-all duration-300"
    :title="isDarkTheme ? '进入亮色主题' : '进入暗色主题'"
    @click="toggleTheme"
  >
    <VIconMoon v-show="!isDarkTheme" title="进入暗色主题" />
    <VIconSun v-show="isDarkTheme" title="进入亮色主题" />
  </div>
</template>
