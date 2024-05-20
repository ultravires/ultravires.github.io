<script lang="ts" setup>
import { data as posts } from '../posts.data.js';
import VHeader from '../components/VHeader.vue';
import VPost from '../components/VPost.vue';
</script>

<template>
  <VHeader />
  <main class="container mx-auto">
    <ul class="mx-auto space-y-8 py-12">
      <li v-for="post in posts">
        <VPost :post="post" />
      </li>
    </ul>
  </main>
</template>