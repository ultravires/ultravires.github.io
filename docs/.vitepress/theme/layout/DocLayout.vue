<script lang="ts" setup>
import VContent from '@theme/components/VContent.vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <div class="container mx-auto">
    <VContent />
  </div>
</template>
