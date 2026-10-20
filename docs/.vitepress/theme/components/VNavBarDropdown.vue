<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    /** 面板相对触发器的对齐方式 */
    align?: 'center' | 'left';
  }>(),
  { align: 'center' }
);

const open = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const panelStyle = ref({ left: '0px', top: '0px' });
let closeTimer: ReturnType<typeof setTimeout> | undefined;

function updatePosition() {
  const rect = triggerRef.value?.getBoundingClientRect();
  if (!rect) return;
  const left =
    props.align === 'center' ? rect.left + rect.width / 2 : rect.left;
  panelStyle.value = { left: `${left}px`, top: `${rect.bottom}px` };
}

function handleEnter() {
  clearTimeout(closeTimer);
  open.value = true;
  updatePosition();
}

function handleLeave() {
  closeTimer = setTimeout(() => {
    open.value = false;
  }, 100);
}

/** SSR 下无 window，避免在 setup 顶层直接引用 */
const eventTarget = import.meta.env.SSR ? undefined : window;
useEventListener(eventTarget, 'scroll', () => open.value && updatePosition(), {
  passive: true
});
useEventListener(eventTarget, 'resize', () => open.value && updatePosition(), {
  passive: true
});
</script>

<template>
  <span
    ref="triggerRef"
    class="inline-flex"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <slot name="trigger" />
  </span>
  <!-- 面板 Teleport 到 body，独立层叠上下文，不会被页面内容遮盖 -->
  <Teleport to="body">
    <Transition name="nav-dropdown">
      <div
        v-if="open"
        class="fixed z-50 pt-3"
        :class="{ '-translate-x-1/2': align === 'center' }"
        :style="[
          panelStyle,
          { transformOrigin: align === 'center' ? 'top center' : 'top left' }
        ]"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.nav-dropdown-enter-active,
.nav-dropdown-leave-active {
  transition:
    opacity 0.3s,
    scale 0.3s;
}

.nav-dropdown-enter-from,
.nav-dropdown-leave-to {
  opacity: 0;
  scale: 0.75;
}
</style>
