<script lang="ts" setup>
import { useData } from 'vitepress';
import { useBannerPreload } from '../composables/useBannerPreload';
import { useImageZoom } from '../composables/useImageZoom';
import VFooter from '../components/VFooter.vue';
import VHeader from '../components/VHeader.vue';
import VSearchBox from '../components/VSearchBox.vue';
import NotFound from '../NotFound.vue';
import AboutLayout from './AboutLayout.vue';
import ColumnLayout from './ColumnLayout.vue';
import DocLayout from './DocLayout.vue';
import HomeLayout from './HomeLayout.vue';
import LinkLayout from './LinkLayout.vue';
import MomentsLayout from './MomentsLayout.vue';
import PageLayout from './PageLayout.vue';
import StatsLayout from './StatsLayout.vue';

const { frontmatter, page } = useData();

useImageZoom();
useBannerPreload();
</script>

<template>
  <!-- 404 页面 -->
  <template v-if="page.isNotFound">
    <NotFound />
  </template>

  <template v-else>
    <div
      v-if="frontmatter.layout !== false"
      class="text-normal flex flex-col"
    >
      <VHeader />

      <!-- 首页 -->
      <HomeLayout v-if="frontmatter.layout === 'home'" />
      <PageLayout v-else-if="frontmatter.layout === 'page'" />
      <ColumnLayout v-else-if="frontmatter.layout === 'column'" />
      <MomentsLayout v-else-if="frontmatter.layout === 'moments'" />
      <LinkLayout v-else-if="frontmatter.layout === 'link'" />
      <StatsLayout v-else-if="frontmatter.layout === 'stats'" />
      <AboutLayout v-else-if="frontmatter.layout === 'about'" />
      <DocLayout v-else />

      <VFooter />

      <!-- 搜索弹窗（仅匹配文章标题与摘要） -->
      <VSearchBox />
    </div>

    <!-- 如果没有指定布局，则使用默认布局 -->
    <Content v-else />
  </template>
</template>
