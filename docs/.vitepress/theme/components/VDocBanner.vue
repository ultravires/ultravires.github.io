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
    <div class="icon-circle"></div>
    <div class="icon-triangle"></div>
    <div class="icon-circle small"></div>
    <VWave />
  </div>
</template>

<style scoped>
.is-blur > img {
  transform: rotate(30deg);
  opacity: .1;
  filter: blur(10px);
  margin-left: 20%;
}

.icon-circle {
  position: absolute;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  top: 30%;
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
  bottom: 20%;
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
