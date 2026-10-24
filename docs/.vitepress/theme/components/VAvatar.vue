<script setup lang="ts">
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

defineProps({
  // 头像整体尺寸（px）
  size: { type: Number, default: 128 }
});

// 统一头像邮箱：与「关于」页的 author.email 保持一致。
// 部分文章缺少 author 信息时回退到该邮箱，避免头像地址不一致。
const AUTHOR_EMAIL = 'x555666777@qq.com';

const avatarUrl = computed(() =>
  getAvatarUrl(frontmatter.value?.author?.email || AUTHOR_EMAIL, 256)
);

const name = computed(() => frontmatter.value?.author?.name || '浅安。');
</script>

<template>
  <div
    class="select-none"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <img
      :src="avatarUrl"
      :alt="`${name} 的头像`"
      class="h-full w-full rounded-full border-2 border-line object-cover transition-transform duration-300 hover:scale-105"
    />
  </div>
</template>
