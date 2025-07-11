<script setup>
import { useData } from 'vitepress';
import SvgInfj from '@theme/assets/svg/INFJ.svg?component';
import { getAvatarUrl } from '@theme/composables/useGravatar';

const { frontmatter } = useData();

const user = frontmatter.value?.self ?? {};
</script>


<template>
  <div>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4 text-center">关于我</h1>

      <!-- 基础信息 -->
      <div class="flex items-center mb-4">
        <img :src="getAvatarUrl(user.email)" alt="Avatar" class="w-16 h-16 rounded-full mr-4">
        <div>
          <h2 class="text-xl font-semibold">{{ user.name }}</h2>
          <p class="text-gray-600">{{ user.bio }}</p>
        </div>
      </div>

      <!-- 性格 -->
      <div class="relative block h-[300px] p-4 bg-[#ddeae3] rounded-xl" href="https://www.16personalities.com/ch/infj-%E4%BA%BA%E6%A0%BC" target="_blank" rel="noopener noreferrer">
        <div class="float-right w-[250px] h-[250px] rotate-y-180">
          <SvgInfj  />
        </div>
        
        <div v-for="personality in user.personalities"  class="flex flex-col gap-2 h-full">
          <div>
            <span class="text-6xl font-bold text-green-600">{{ personality.text }}</span>
          </div>
          <div>
            <span class="text-neutral-700 text-3xl font-bold">{{ personality.flag }}</span>
          </div>
          <p>{{ personality.desc }}</p>
          <div class="mt-auto">
            <a class="text-sm text-green-800" :href="personality.link" target="_blank">
              了解人格类型描述 &gt;
            </a>
          </div>
        </div>
        <!-- <figure class="max-w-[1000px]">
          <picture class="scene relative z-10 mb-[-52px] block h-auto px-15 medium:mb-[-108px] medium:px-20 huge:mb-0 huge:me-[-20px] huge:ms-auto huge:mt-[-18.831%] huge:max-w-[58.44%] huge:px-0 huge-3:max-w-[900px] huge-4:me-[-80px]">
            <source media="(min-width: 1200px)" srcset="https://www.16personalities.com/static/images/types/headers/advocate-desktop2.svg">
            <source media="(min-width: 768px)" srcset="https://www.16personalities.com/static/images/types/headers/advocate-desktop1.svg">
            <img src="https://www.16personalities.com/static/images/types/headers/advocate-mobile.svg" alt="一幅代表INFJ人格类型（提倡者）的场景。一位留着胡须的INFJ男子站在森林空地上，挥动着一根魔杖，魔杖朝一棵长着脸并快乐挥手的树发出闪烁光芒。这位INFJ男子脸上带着睿智、沉思的表情，似乎正在与树交谈。场景中散布着各种树木、花朵和几何形状的石头，增添了神秘而富有想象力的氛围。整体风格梦幻而奇思妙想，反映了INFJ富有远见和理想主义的本质。" class="block huge:min-h-[313px] huge-2:min-h-[369px] huge-3:min-h-[350px]">
          </picture>
        </figure> -->
      </div>
    </div>
  </div>
</template>