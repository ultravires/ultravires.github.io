<script setup lang="ts">
import { init } from '@waline/client';
import '@waline/client/style';
import { onMounted, ref } from 'vue';

const walineRef = ref<HTMLDivElement>();

onMounted(() => {
  if (walineRef.value) {
    init({
      el: walineRef.value,
      serverURL: 'https://waline-comment-bay.vercel.app/'
    });
  }
});
</script>

<template>
  <div ref="walineRef"></div>
</template>
