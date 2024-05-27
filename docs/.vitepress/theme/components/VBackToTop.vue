<script lang="ts" setup>
import VIconBackToTop from './icons/VIconBackToTop.vue';

const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
};
</script>

<template>
  <div
    class="
      dark:bg-white
      dark:hover:bg-primary
      hover:bg-primary
      VBackToTop
      group
      relative
      flex
      items-center
      justify-center
      px-4
      bg-black
      text-reverse
      text-sm
      rounded-full
      whitespace-nowrap
      leading-loose
      cursor-pointer
      transition-colors
      duration-300
    "
    @click="scrollToTop">
    <span class="group-hover:invisible">回到顶部</span>
    <span class="group-hover:visible invisible absolute flex items-center justify-center">
      <VIconBackToTop title="回到顶部" />
    </span>
  </div>
</template>

<style scoped>
.VBackToTop {
  animation-name: the-animation;
  animation-timing-function: linear;
  animation-timeline: --page-scroll;
}

@keyframes the-animation {
  0% {
    display: none;
  }
  .0001% {
    display: flex;
  }
  100% {
    display: flex;
  }
}
</style>