<script lang="ts" setup>
import { ref } from 'vue';
import { data as posts } from '../posts.data.js';
import VPost from '../components/VPost.vue';
import VPostCard from '../components/VPostCard.vue';

const type = ref('card'); // 'card' | 'list'
</script>

<template>
  <ul class="flex flex-wrap w-full">
    <li
      v-for="post in posts"
      :key="post.title"
      :class="[
        {
          'max-md:w-full max-md:mr-0 even:mr-0 w-[calc(calc(100%-1rem)/2)] mr-4 mb-4':
            type === 'card',
        },
        { 'w-full mb-8': type === 'list' },
      ]"
    >
      <VPost v-if="type === 'list'" :post="post" />
      <VPostCard v-else-if="type === 'card'" :post="post" />
    </li>
  </ul>
</template>
