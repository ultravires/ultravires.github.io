<script setup lang="ts">
import { toRefs } from 'vue';
import VLink from './VLink.vue';

const props = defineProps<{
  imageUrl: string;
  href: string;
}>();

const { imageUrl, href } = toRefs(props);
</script>

<template>
  <VLink
    tag="div"
    :href="href"
    class="relative h-[300px] w-[200px] cursor-pointer overflow-hidden rounded-md"
  >
    <div
      class="hover:scale-115 h-[300px] w-[200px] bg-cover bg-center bg-no-repeat transition-transform"
      :style="`background-image: url(${imageUrl});`"
    ></div>
    <div
      class="absolute top-0 box-border flex h-10 w-full items-center justify-between p-2"
    >
      <div>
        <img
          class="m-0! h-4 w-4"
          src="http://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/icon.png~tplv-a9rns2rl98-image.image?rk3s=c3b0d92e&amp;x-expires=1791431360&amp;x-signature=0OhC%2Bx5S9tTJIL%2B7T4VnfEYOu9g%3D"
        />
      </div>
      <div class="play-btn-container">
        <span
          role="img"
          class="semi-icon semi-icon-default text-22"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              fill-opacity="0.3"
              fill-rule="evenodd"
              d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11"
              clip-rule="evenodd"
            ></path>
            <path
              fill="#fff"
              d="M9.658 16.596a.6.6 0 0 1-.472-.216Q9 16.164 9 15.8V8.79q0-.363.186-.575A.6.6 0 0 1 9.658 8q.152 0 .29.054.143.054.306.148l5.62 3.356q.31.183.443.344.133.163.133.394a.6.6 0 0 1-.133.393 1.8 1.8 0 0 1-.444.349l-5.62 3.352q-.162.098-.304.152a.8.8 0 0 1-.291.054"
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <div class="absolute bottom-0 w-full p-3">
      <div class="caption-text-container">
        <div
          class="video-caption video-caption overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-medium leading-[18px] text-white"
        >
          7分钟速通Agent Skills是什么？
          跟MCP|Workflow|Command|Prompt有什么关系？ #程序员 #编程 #MCP
          #ai新星计划 #抖音年味新知贺岁
        </div>
      </div>
    </div>
  </VLink>
</template>
