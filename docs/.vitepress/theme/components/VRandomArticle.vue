<script lang="ts" setup>
import { useRouter } from 'vitepress';
import VIconDice from './icons/VIconDice.vue';
import { data as posts } from '../posts.data.js';
import { computed, ref } from 'vue';

const router = useRouter();

const duration = ref(1); // s
const rotating = ref(false);
const oldRandom = ref(-1);

const diceAnimationDuration = computed(() => {
  return duration.value + 's';
});

const getRandom = (): number => {
  const random = Math.floor(Math.random() * posts.length);
  if (oldRandom.value !== random || posts.length === 1) {
    oldRandom.value = random;
    return random;
  }
  return getRandom();
};

const visiteRandomArticle = () => {
  if (rotating.value) return;
  rotating.value = true;
  setTimeout(() => {
    rotating.value = false;
  }, duration.value * 1000);
  const random = getRandom();
  router.go(posts[random].url);
};
</script>

<template>
  <div class="hover:bg-primary hover:text-reverse p-1 rounded-full cursor-pointer" title="随机访问该站文章" @click="visiteRandomArticle">
    <VIconDice :class="['dice', { rotating }]" />
  </div>
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