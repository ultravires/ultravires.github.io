<script lang="ts" setup>
import GiscusComment from '@theme/components/GiscusComment.vue';
import PageContainer from '@theme/components/PageContainer.vue';
import VContent from '@theme/components/VContent.vue';
import { useSearchHighlight } from '@theme/composables/useSearchHighlight';
// 从搜索结果跳转进入文章页后，高亮正文中的搜索词
useSearchHighlight();
</script>

<template>
  <PageContainer>
    <VContent />
  </PageContainer>
  <PageContainer>
    <GiscusComment />
  </PageContainer>
</template>
