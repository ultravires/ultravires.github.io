<script lang="ts" setup>
import VContent from '@theme/components/VContent.vue';
import WalineComment from '@theme/components/WalineComment.vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <div class="container mx-auto">
    <VContent />
    <WalineComment />
  </div>
</template>
