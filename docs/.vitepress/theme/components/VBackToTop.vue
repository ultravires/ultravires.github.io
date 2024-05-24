<script lang="ts" setup>
const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  })
};
</script>

<template>
  <button class="dark:bg-white dark:hover:bg-primary hover:bg-primary VBackToTop text-xs whitespace-nowrap bg-black text-reverse rounded-full leading-loose" @click="scrollToTop">回到顶部</button>
</template>

<style scoped>
.VBackToTop {
  animation: opacity-transform auto linear;
  animation-timeline: --page-scroll;
  opacity: 0;
  width: 0;
}

@keyframes opacity-transform {
  0% {
    width: 0;
    opacity: 0;
  }
  .1% {
    width: 6em;
    opacity: 1;
  }
  100% {
    width: 6em;
    opacity: 1;
  }
}
</style>