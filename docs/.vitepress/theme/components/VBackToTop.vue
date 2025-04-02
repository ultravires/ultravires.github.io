<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { throttleAndDebounce } from '../support/utils';
import VIconBackToTop from '../assets/svg/top.svg?component';

const isShow = ref<boolean>(false);
const backToTopRef = ref<HTMLElement | null>(null);

const scrollToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
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
      ref="backToTopRef"
      v-show="isShow"
      class="
        VBackToTop
        group
        relative
        flex
        items-center
        justify-center
        w-[32px]
        h-[32px]
        bg-black/90
        text-white
        text-xs
        rounded-full
        whitespace-nowrap
        leading-loose
        cursor-pointer
        box-content
        duration-300
        animate-progress-timeline
        dark:bg-white/90
        dark:text-black
        dark:hover:bg-primary
        hover:bg-primary
      "
      @click="scrollToTop"
    >
      <span class="group-hover:visible invisible absolute flex items-center justify-center">
        <VIconBackToTop title="回到顶部" />
      </span>
    </div>
  </Transition>
</template>

<style scoped>
.VBackToTop {
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  width: 32px;
  height: 32px;
}

.fade-enter-from,
.fade-leave-to {
  width: 0;
  height: 0;
  margin: 0;
}
</style>