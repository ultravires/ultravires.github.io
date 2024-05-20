<script lang="ts" setup>
import { useRouter } from 'vitepress';
import VIconDice from './icons/VIconDice.vue';
import { data as posts } from '../posts.data.js';

const router = useRouter();

const visiteRandomArticle = () => {
  const random = Math.floor(Math.random() * posts.length);
  router.go(posts[random].url);
};
</script>

<template>
  <VIconDice title="随机访问该站文章" @click="visiteRandomArticle" />
</template>