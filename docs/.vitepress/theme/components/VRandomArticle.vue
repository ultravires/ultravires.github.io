<script lang="ts" setup>
import { useRouter } from 'vitepress';
import VIconDice from './icons/VIconDice.vue';
import { data as posts } from '../posts.data.js';
import { computed, ref } from 'vue';

const router = useRouter();

const duration = ref(1); // s
const rotating = ref(false);

const diceAnimationDuration = computed(() => {
  return duration.value + 's';
});

const visiteRandomArticle = () => {
  rotating.value = true;
  setTimeout(() => {
    rotating.value = false;
  }, duration.value * 1000);
  const random = Math.floor(Math.random() * posts.length);
  router.go(posts[random].url);
};
</script>

<template>
  <VIconDice :class="['dice', { rotating }]" title="随机访问该站文章" @click="visiteRandomArticle" />
</template>

<style scoped>
.dice.rotating {
  animation: rotate v-bind(diceAnimationDuration) cubic-bezier(0.075, 0.82, 0.165, 1);
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(720deg);
  }
}
</style>