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
  animation-name: the-animation;
  animation-timing-function: linear;
  animation-timeline: --page-scroll;
  opacity: 0;
  width: 0;
}

@keyframes the-animation {
  0% {
    width: 0;
    opacity: 0;
  }
  .0001% {
    width: 6em;
    opacity: 1;
  }
  100% {
    width: 6em;
    opacity: 1;
  }
}
</style>