<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { throttleAndDebounce } from '../support/utils';
import VIconBackToTop from './icons/VIconBackToTop.vue';

const isShow = ref(false);

const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  })
};

const handleScroll = throttleAndDebounce(() => {
  if (document.documentElement.scrollTop > 0) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
}, 500);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <Transition name="fade">
    <div
      v-show="isShow"
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
        w-20
        h-7
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
      <span class="group-hover:invisible">回到顶部</span>
      <span class="group-hover:visible invisible absolute flex items-center justify-center">
        <VIconBackToTop title="回到顶部" />
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  width: 5rem;
  height: 1.75rem;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  width: 0;
  height: 0;
  opacity: .5;
  overflow: hidden;
}
</style>