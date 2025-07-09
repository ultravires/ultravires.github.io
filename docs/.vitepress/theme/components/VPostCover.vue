<script setup>
import { withBase } from 'vitepress';

defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const darkGradients = [
  ["#2b5876", "#4e4376"],
  ["#1e3c72", "#2a5298"],
  ["#4b134f", "#c94b4b"],
  ["#232526", "#414345"],
  ["#0f2027", "#203a43", "#2c5364"],
];

function applyRandomGradient() {
  const randomGradient = darkGradients[Math.floor(Math.random() * darkGradients.length)];
  return {
    backgroundImage: `linear-gradient(45deg, ${randomGradient.join(", ")})`
  };
}
</script>

<template>
  <figure
    :style="applyRandomGradient()"
    class="cover group-hover/post-card:scale-105 dark:bg-neutral-800 relative flex justify-center items-center w-full h-full bg-slate-700 transition-transform duration-300"
  >
    <img
      v-if="typeof post.cover === 'string' || (typeof post.cover === 'object' && post.cover.url)"
      class="min-w-24 w-auto h-auto bg-transparent border-0 outline-0 object-contain drop-shadow-[0_25px_25px_rgb(0_0_0_/_1)]"
      :src="
        withBase(
          typeof post.cover === 'string' ? post.cover : post.cover.url || ''
        )
      "
      loading="lazy"
      draggable="false"
      @load="handleImageLoaded"
    />
    <figcaption
      v-else-if="typeof post.cover === 'object' && post.cover.text"
      class="absolute flex justify-center items-center gap-14 w-full h-full whitespace-nowrap z-0"
    >
      <h1 class="text-white text-2xl font-black tracking-wider drop-shadow-2xl">
        {{ post.cover.text }}
      </h1>
      <span class="icon-circle"></span>
      <span class="icon-triangle"></span>
      <span class="icon-circle small"></span>
    </figcaption>
    <div
      v-else
      class="absolute flex justify-center items-center gap-14 w-full h-full whitespace-nowrap z-0"
    >
      <h1 class="text-white text-2xl font-black tracking-wider drop-shadow-2xl">
        暂无封面
      </h1>
      <div class="icon-circle"></div>
      <div class="icon-triangle"></div>
      <div class="icon-circle small"></div>
    </div>
  </figure>
</template>

<style scoped>
.cover {
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 200% 200%;
  animation: gradientFlow 8s ease infinite;
  user-select: none;
}

.cover h1 {
  font-size: clamp(24px, 5vw, 36px);
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin: 0;
  z-index: 1;
}

.icon-circle {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  top: 15px;
  left: 15px;
  animation: float 4s ease-in-out infinite;
}

.icon-circle.small {
  width: 25px;
  height: 25px;
  top: 110px;
  left: calc(100% - 50px);
  animation: float 3s ease-in-out infinite reverse;
}

.icon-triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 25px solid rgba(255, 255, 255, 0.3);
  bottom: 15px;
  right: 15px;
  animation: float 5s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
