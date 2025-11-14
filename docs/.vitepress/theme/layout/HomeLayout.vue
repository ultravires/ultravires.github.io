<script lang="ts" setup>
import VPostList from '@theme/components/VPostList.vue';
import { data as posts } from '../posts.data.js';
</script>

<template>
  <section class="container mx-auto min-h-dvh">
    <main class="@container/main">
      <div
        class="mx-auto rounded-xl border border-slate-200 bg-white px-8 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <VPostList :posts="posts" />
      </div>
    </main>
  </section>
</template>
