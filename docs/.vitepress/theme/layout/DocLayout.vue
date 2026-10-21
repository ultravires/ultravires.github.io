<script lang="ts" setup>
import VContent from '@theme/components/VContent.vue';
import GiscusComment from '@theme/components/GiscusComment.vue';
import { useSearchHighlight } from '@theme/composables/useSearchHighlight';
import { useData } from 'vitepress';

const { frontmatter } = useData();

// 从搜索结果跳转进入文章页后，高亮正文中的搜索词
useSearchHighlight();
</script>

<template>
  <div class="container mx-auto">
    <VContent />
    <GiscusComment />
  </div>
</template>
