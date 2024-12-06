<script lang="ts" setup>
import { useData } from 'vitepress';
import VIconHome from '../assets/svg/home.svg?component';

const { site, theme } = useData();
const siteData = site.value;
const themeData = theme.value;
</script>

<template>
  <a class="decoration-none font-AlibabaPuHuiTiBold text-md text-xl leading-none whitespace-nowrap" href="/">
    {{ themeData.siteTitle || siteData.title }}
  </a>
</template>
