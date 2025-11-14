<script lang="ts" setup>
import { ref } from 'vue';
import VPost from '../components/VPost.vue';
import VPostCard from '../components/VPostCard.vue';
import { type Post } from '../posts.data.js';

defineProps<{
  posts: Post[];
}>();

const type = ref('list'); // 'card' | 'list'
</script>

<template>
  <ul class="flex w-full flex-wrap">
    <li
      v-for="post in posts"
      :key="post.title"
      :class="[
        {
          'mr-4 mb-4 w-[calc(calc(100%-1rem)/2)] even:mr-0 max-md:mr-0 max-md:w-full':
            type === 'card'
        },
        { 'mb-8 w-full': type === 'list' }
      ]"
    >
      <VPost
        v-if="type === 'list'"
        :post="post"
      />
      <VPostCard
        v-else-if="type === 'card'"
        :post="post"
      />
    </li>
  </ul>
</template>
