<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { throttleAndDebounce } from '../support/utils';
import VIconBackToTop from '../assets/svg/top.svg?component';

const isShow = ref(false);
const isBottom = ref(false);
const backToTopRef = ref<HTMLElement | null>(null);
const progress = ref(0);

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

function updateProgress() {
  // 获取文档总高度
  const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  // 获取当前滚动位置
  const scrollPosition = window.scrollY;
  // 更新百分比显示
  progress.value = Math.round((scrollPosition / totalHeight) * 100);
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', updateProgress);
});
</script>

<template>
  <Transition name="v-scale" :duration="{ enter: 0, leave: 300 }">
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
        min-w-6
        min-h-6
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
      <span class="group-hover:invisible" :class="{ 'px-2': progress > 90 }">
        {{ progress > 90 ? '回到顶部' : progress }}
      </span>
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

.v-scale-enter-active,
.v-scale-leave-active {
  transform-origin: right center;
  transition: all 0.3s ease-in-out;
}

.v-scale-enter-from,
.v-scale-leave-to {
  transform: scale(0);
}
</style>