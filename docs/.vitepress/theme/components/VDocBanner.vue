<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ColorThief from 'colorthief';
import { useData, withBase } from 'vitepress';
import VWave from './VWave.vue';

const { frontmatter } = useData();

const imageRef = ref<HTMLImageElement | null>(null);

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

onMounted(() => {
  const colorThief = new ColorThief();
  if (imageRef.value?.complete) {
    console.log('complete');
    const [r, g, b] = colorThief.getColor(imageRef.value);
    document.documentElement.style.setProperty('--color-primary', `rgb(${r}, ${g}, ${b})`);
  } else {
    imageRef.value?.addEventListener('load', function() {
      console.log('load');
      const [r, g, b] = colorThief.getColor(imageRef.value);
      console.log(r,g,b)
      document.documentElement.style.setProperty('--color-primary', `rgb(${r}, ${g}, ${b})`);
    });
  }
});
</script>

<template>
  <div
    v-show="frontmatter?.banner"
    :style="applyRandomGradient()"
    class="before:content-normal before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-neutral-900/30 relative w-full h-full bg-primary overflow-hidden -z-10 select-none"
    :class="{ 'before:backdrop-blur-lg before:opacity-90 is-blur': frontmatter?.banner?.blur }"
    draggable="false"
  >
    <div class="triangle1"></div>
    <div class="triangle2"></div>
    <div class="circle"></div>
    <div class="rectangle"></div>
    <VWave />
  </div>
</template>

<style scoped>
/* 几何图形 - 三角形1 */
.triangle1 {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 300px solid rgba(255, 255, 255, 0.1);
  top: -50px;
  left: -50px;
  transform: rotate(45deg);
  animation: float 6s ease-in-out infinite;
}

/* 几何图形 - 三角形2 */
.triangle2 {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-top: 200px solid rgba(255, 255, 255, 0.08);
  bottom: -50px;
  right: 50px;
  animation: float 8s ease-in-out infinite reverse;
}

/* 几何图形 - 圆形 */
.circle {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  bottom: -100px;
  right: -50px;
  animation: pulse 5s ease-in-out infinite;
}

/* 几何图形 - 矩形 */
.rectangle {
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.12);
  top: 20px;
  right: 150px;
  transform: rotate(15deg);
  animation: rotate 10s linear infinite;
}

/* 动画定义 */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-20px) rotate(45deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes rotate {
  0% { transform: rotate(15deg); }
  100% { transform: rotate(375deg); }
}
</style>
