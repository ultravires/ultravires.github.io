<script setup>
import { data as posts } from '../posts.data.ts';
</script>

<template>
  <div class="container mx-auto">
    <ul>
      <li v-for="post in posts">{{ post.title }}</li>
    </ul>
  </div>
</template>
