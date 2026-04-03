<script lang="ts" setup>
import { useData } from 'vitepress';
import GlitchArtText from './GlitchArtText.vue';

const { site, theme } = useData();
const siteData = site.value;
const themeData = theme.value;
</script>

<template>
  <a
    class="decoration-none text-md whitespace-nowrap text-xl leading-none"
    href="/"
  >
    <div class="scale-70">
      <GlitchArtText :text="themeData.siteTitle || siteData.title" />
    </div>
  </a>
</template>
