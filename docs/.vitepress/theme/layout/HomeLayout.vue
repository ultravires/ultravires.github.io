<script lang="ts" setup>
import PageContainer from '@theme/components/PageContainer.vue';
import VPostList from '@theme/components/VPostList.vue';
import { data as posts } from '../posts.data.js';
</script>

<template>
  <PageContainer>
    <VPostList :posts="posts" />
  </PageContainer>
</template>
