<script lang="ts" setup>
import { useData } from 'vitepress';
import VFooter from '../components/VFooter.vue';
import VHeader from '../components/VHeader.vue';
import VWeatherParticleBackground from '../components/VWeatherParticleBackground.vue';
import NotFound from '../NotFound.vue';
import AboutLayout from './AboutLayout.vue';
import ColumnLayout from './ColumnLayout.vue';
import DocLayout from './DocLayout.vue';
import HomeLayout from './HomeLayout.vue';
import PageLayout from './PageLayout.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <!-- 404 页面 -->
  <template v-if="page.isNotFound">
    <NotFound />
  </template>

  <template v-else>
    <VWeatherParticleBackground />
    <div
      v-if="frontmatter.layout !== false"
      class="text-normal flex flex-col"
    >
      <VHeader />

      <!-- 首页 -->
      <HomeLayout v-if="frontmatter.layout === 'home'" />
      <PageLayout v-else-if="frontmatter.layout === 'page'" />
      <ColumnLayout v-else-if="frontmatter.layout === 'column'" />
      <AboutLayout v-else-if="frontmatter.layout === 'about'" />
      <DocLayout v-else />

      <VFooter />
    </div>

    <!-- 如果没有指定布局，则使用默认布局 -->
    <Content v-else />
  </template>
</template>
