<script lang="ts" setup>
defineProps<{
  src: string;
  width?: string | number;
  height?: string | number;
}>();
</script>

<template>
  <iframe
    :src="src"
    :width="width"
    :height="height"
    scrolling="no"
    border="0"
    frameborder="no"
    framespacing="0"
    allowfullscreen="true"
  ></iframe>
</template>
