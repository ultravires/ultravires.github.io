<script setup lang="ts">
import { useData } from 'vitepress';

const { theme, frontmatter } = useData();
</script>

<template>
  <footer v-if="theme.footer && frontmatter.footer !== false" class="relative py-8 px-6 text-sm text-neutral-400">
    <div class="container mx-auto">
      <p v-if="theme.footer.message" class="text-center" v-html="theme.footer.message"></p>
      <p v-if="theme.footer.copyright" class="text-center" v-html="theme.footer.copyright"></p>
    </div>
  </footer>
</template>