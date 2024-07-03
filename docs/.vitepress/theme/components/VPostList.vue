<script lang="ts" setup>
import { data as posts } from '../posts.data.js';
import VPost from '../components/VPost.vue';
import VPostCard from '../components/VPostCard.vue';
</script>

<template>
  <ul class="flex flex-wrap">
    <li
      v-for="post in posts"
      :key="post.title"
      class="even:mr-0 w-[calc(calc(100%-1rem)/2)] mr-4 mb-4"
    >
      <!-- <VPost :post="post" /> -->
      <VPostCard :post="post" />
    </li>
  </ul>
</template>
