<script lang="ts" setup>
interface Props {
  /** 提示内容 */
  content: string;
  /** 弹出位置 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  placement: 'bottom'
});
</script>

<template>
  <span class="v-tooltip">
    <slot />
    <span
      class="v-tooltip__content"
      :class="`is-${placement}`"
      role="tooltip"
    >
      {{ content }}
    </span>
  </span>
</template>

<style scoped>
.v-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.v-tooltip__content {
  position: absolute;
  z-index: 50;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;

  /* 反色配色，通过主题变量自动适配暗黑/亮色 */
  color: rgb(var(--web-color-reverse, 255 255 255));
  background-color: rgb(var(--web-color-base, 34 31 32) / 0.95);

  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
}

.v-tooltip:hover .v-tooltip__content {
  opacity: 1;
  visibility: visible;
  /* 仅延迟出现，消失立即响应 */
  transition-delay: 150ms;
}

/* 小三角箭头，颜色跟随气泡背景 */
.v-tooltip__content::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: inherit;
  transform: rotate(45deg);
}

/* 弹出位置：默认隐藏在贴近触发元素的一侧，悬停时滑出 */
.is-bottom {
  top: 100%;
  left: 50%;
  margin-top: 8px;
  transform: translate(-50%, -4px);
}

.is-top {
  bottom: 100%;
  left: 50%;
  margin-bottom: 8px;
  transform: translate(-50%, 4px);
}

.is-left {
  right: 100%;
  top: 50%;
  margin-right: 8px;
  transform: translate(4px, -50%);
}

.is-right {
  left: 100%;
  top: 50%;
  margin-left: 8px;
  transform: translate(-4px, -50%);
}

.v-tooltip:hover .is-bottom,
.v-tooltip:hover .is-top {
  transform: translate(-50%, 0);
}

.v-tooltip:hover .is-left,
.v-tooltip:hover .is-right {
  transform: translate(0, -50%);
}

.is-bottom::before {
  top: -3px;
  left: calc(50% - 4px);
}

.is-top::before {
  bottom: -3px;
  left: calc(50% - 4px);
}

.is-left::before {
  right: -3px;
  top: calc(50% - 4px);
}

.is-right::before {
  left: -3px;
  top: calc(50% - 4px);
}
</style>
