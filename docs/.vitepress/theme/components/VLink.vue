<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  tag?: string,
  href?: string,
  target?: string
}>();

const tag = computed(() => {
  return props.tag ?? (props.href ? 'a' : 'span');
});

const isExternal = computed(() => {
  return (props.target === '_blank');
});
</script>

<template>
  <component :class="{ 'cursor-default': tag !== 'a' }" :is="tag" :href="href" :target="target ?? (isExternal ? '_blank' : undefined)">
    <slot />
  </component>
</template>