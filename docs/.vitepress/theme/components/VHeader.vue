<script lang="ts" setup>
import { useData } from 'vitepress';
import ParticleBanner from './ParticleBanner.vue';
import VNavBar from './VNavBar.vue';
import VPostInfo from './VPostInfo.vue';

const { frontmatter } = useData();
</script>

<template>
  <header
    class="VHeader relative top-0 z-10 mb-4"
    :class="
      frontmatter?.layout !== 'home' && frontmatter?.banner ? 'h-96' : 'h-16'
    "
  >
    <!-- 导航栏 -->
    <VNavBar />

    <!-- 文章横幅 -->
    <div
      class="absolute left-0 top-0 -z-10 flex h-full w-full flex-col items-center justify-center"
    >
      <!-- 横幅背景 -->
      <ParticleBanner
        v-if="frontmatter?.banner"
        :speed="0.1"
      >
        <VPostInfo />
      </ParticleBanner>
      <VPostInfo v-else />
    </div>
  </header>
</template>
