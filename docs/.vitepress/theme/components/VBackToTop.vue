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
      dark:bg-opacity-90
      dark:hover:bg-primary
      hover:bg-primary
      VBackToTop
      group
      relative
      flex
      items-center
      justify-center
      bg-black
      bg-opacity-90
      text-reverse
      text-sm
      rounded-full
      whitespace-nowrap
      leading-loose
      cursor-pointer
      transition-all
      duration-300
    "
    @click="scrollToTop">
    <span class="group-hover:invisible px-3">回到顶部</span>
    <span class="group-hover:visible invisible absolute flex items-center justify-center">
      <VIconBackToTop title="回到顶部" />
    </span>
  </div>
</template>

<style scoped>
.VBackToTop {
  animation: the-animation auto linear;
  animation-timeline: --page-scroll;
  width: 0;
  overflow: hidden;
}

@keyframes the-animation {
  from {
    width: 0;
  }
  .0001% {
    width: auto;
  }
}
</style>