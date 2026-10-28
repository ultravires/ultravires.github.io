<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
import { resolveBannerStyle } from '../support/banner';
import GradientBanner from './GradientBanner.vue';
import ImageBanner from './ImageBanner.vue';
import ParticleBanner from './ParticleBanner.vue';
import VNavBar from './VNavBar.vue';
import VPostInfo from './VPostInfo.vue';

const { frontmatter } = useData();

const bannerStyle = computed(() =>
  frontmatter.value?.layout === 'home'
    ? null
    : resolveBannerStyle(frontmatter.value?.banner)
);

const BANNER_COMPONENTS = {
  particle: ParticleBanner,
  gradient: GradientBanner,
  image: ImageBanner
} as const;

const bannerComponent = computed(
  () => BANNER_COMPONENTS[bannerStyle.value ?? 'particle']
);
</script>

<template>
  <header
    class="VHeader relative top-0 z-10"
    :class="bannerStyle ? 'h-96' : 'h-16'"
  >
    <!-- 导航栏 -->
    <VNavBar />

    <!-- 文章横幅 -->
    <div
      class="absolute left-0 top-0 -z-10 flex h-full w-full flex-col items-center justify-center"
    >
      <!-- 横幅背景 -->
      <component
        :is="bannerComponent"
        v-if="bannerStyle"
        :speed="0.1"
      >
        <VPostInfo />
      </component>
      <VPostInfo v-else />
    </div>
  </header>
</template>
