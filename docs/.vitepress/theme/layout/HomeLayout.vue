<script lang="ts" setup>
import { data as posts } from '../posts.data.js';
import VPost from '../components/VPost.vue';
</script>

<template>
  <div class="container mx-auto flex-grow">
    <ul class="space-y-8 max-md:px-12 py-12">
      <li v-for="post in posts">
        <VPost :post="post" />
      </li>
    </ul>
  </div>
</template>