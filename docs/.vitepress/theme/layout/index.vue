<script lang="ts" setup>
import { useData } from "vitepress";
import VHeader from "../components/VHeader.vue";
import NotFound from "../NotFound.vue";
import HomeLayout from "./HomeLayout.vue";
import DocLayout from "./DocLayout.vue";
import PageLayout from "./PageLayout.vue";
import VFooter from "../components/VFooter.vue";
import VPageProgress from "@theme/components/VPageProgress.vue";
import VBackground from "@theme/components/VBackground.vue";
import ColumnLayout from "./ColumnLayout.vue";
import AboutLayout from "./AboutLayout.vue";

const { frontmatter, page } = useData();
</script>

<template>
  <template v-if="page.isNotFound">
    <NotFound />
  </template>
  <template v-else>
    <VBackground />
    <VPageProgress />
    <section
      v-if="frontmatter.layout !== false"
      class="text-normal flex flex-col"
    >
      <VHeader />

      <section class="flex w-full gap-4">
        <div
          class="@container min-h-screen w-full flex-grow transition-all duration-100"
        >
          <!-- 首页 -->
          <HomeLayout v-if="frontmatter.layout === 'home'" />
          <PageLayout v-else-if="frontmatter.layout === 'page'" />
          <ColumnLayout v-else-if="frontmatter.layout === 'column'" />
          <AboutLayout v-else-if="frontmatter.layout === 'about'" />
          <DocLayout v-else />
        </div>
      </section>

      <VFooter />
    </section>

    <Content v-else />
  </template>
</template>
