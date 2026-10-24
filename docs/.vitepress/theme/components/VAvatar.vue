<script setup lang="ts">
import { getAvatarUrl } from '@theme/composables/useGravatar';
import { computed, useId } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

const props = defineProps({
  // 头像整体尺寸（px）
  size: { type: Number, default: 128 },
  // 环绕署名文字，留空时默认「作者名 ◆ 浅安。 ◆」
  caption: { type: String, default: '' }
});

// 使用 useId 生成 SSR 安全的唯一 ID，避免 Math.random 造成的水合不一致
const uid = useId();
const circleId = `vav-circle-${uid}`;
const auraId = `vav-aura-${uid}`;
const ringPathId = `vav-ring-${uid}`;

const avatarUrl = computed(() =>
  getAvatarUrl(frontmatter.value?.author?.email, 256)
);

const name = computed(() => frontmatter.value?.author?.name || '浅安。');

const site = '浅安。';

const caption = computed(() => {
  if (props.caption) return props.caption;
  // 有作者名时署名「作者名 ◆ 站点名」，否则仅署名站点名，避免重复
  return name.value && name.value !== site
    ? `${name.value} ◆ ${site} ◆ `
    : `${site} ◆ `;
});

// 环绕署名：按目标字符数重复，尽量铺满整圈（约一整圈周长）
const fullText = computed(() => {
  const c = caption.value;
  const target = 36;
  return c.repeat(Math.ceil(target / c.length));
});
</script>

<template>
  <div
    class="select-none"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      class="v-avatar-svg block h-full w-full"
      role="img"
      :aria-label="`${name} 的头像`"
    >
      <defs>
        <clipPath :id="circleId">
          <circle cx="100" cy="100" r="58" />
        </clipPath>
        <radialGradient :id="auraId">
          <stop
            offset="0%"
            stop-color="var(--color-primary)"
            stop-opacity="0.16"
          />
          <stop
            offset="70%"
            stop-color="var(--color-primary)"
            stop-opacity="0.05"
          />
          <stop
            offset="100%"
            stop-color="var(--color-primary)"
            stop-opacity="0"
          />
        </radialGradient>
        <path
          :id="ringPathId"
          d="M 100, 100 m -82, 0 a 82, 82 0 1, 1 164, 0 a 82, 82 0 1, 1 -164, 0"
          fill="none"
        />
      </defs>

      <!-- 印痕：柔和光晕 -->
      <circle
        cx="100"
        cy="100"
        r="100"
        :fill="`url(#${auraId})`"
      />

      <!-- 外环 / 内环 -->
      <circle
        cx="100"
        cy="100"
        r="92"
        class="v-avatar-ring v-avatar-ring--outer"
      />
      <circle
        cx="100"
        cy="100"
        r="64"
        class="v-avatar-ring v-avatar-ring--inner"
      />

      <!-- 头像照片 -->
      <image
        :href="avatarUrl"
        width="200"
        height="200"
        preserveAspectRatio="xMidYMid slice"
        :clip-path="`url(#${circleId})`"
        class="v-avatar-img"
      />

      <!-- 环绕署名 -->
      <text class="v-avatar-text">
        <textPath
          :href="`#${ringPathId}`"
          startOffset="0%"
        >
          {{ fullText }}
        </textPath>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.v-avatar-svg {
  overflow: visible;
}

.v-avatar-ring {
  fill: none;
  stroke: var(--color-primary);
  transition: opacity 0.4s ease;
}

.v-avatar-ring--outer {
  stroke-width: 1.25;
  opacity: 0.4;
}

.v-avatar-ring--inner {
  stroke-width: 1;
  opacity: 0.26;
}

.v-avatar-text {
  font-family:
    var(--font-AlibabaPuHuiTiMedium),
    system-ui,
    -apple-system,
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 5px;
  fill: var(--color-primary);
  opacity: 0.82;
  pointer-events: none;
}

.v-avatar-img {
  transform-origin: center;
  transform-box: view-box;
  transition: transform 0.5s ease;
}

.v-avatar-svg:hover .v-avatar-img {
  transform: scale(1.06);
}

.v-avatar-svg:hover .v-avatar-ring {
  opacity: 0.85;
}
</style>
