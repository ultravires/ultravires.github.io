<script lang="ts" setup>
import VContent from '@theme/components/VContent.vue';
</script>

<template>
  <div>
    <slot name="page-top" />
    <VContent />
    <slot name="page-bottom" />
  </div>
</template>
