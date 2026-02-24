<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  tag?: string;
  href?: string;
  target?: string;
}>();

const tag = computed(() => {
  return props.tag ?? (props.href ? 'a' : 'span');
});

const isExternal = computed(() => {
  return props.target === '_blank';
});

const handleClick = () => {
  if (props.href && props.tag && props.tag !== 'a') {
    window.open(
      props.href,
      props.target ?? (isExternal ? '_blank' : undefined)
    );
  }
};
</script>

<template>
  <component
    :class="{ 'cursor-default': tag !== 'a' }"
    :is="tag"
    :href="href"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
