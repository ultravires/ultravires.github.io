<script lang="ts" setup>
import { computed } from 'vue';
import { getIcon } from '../support/icons';

const props = defineProps<{
  /** 图标名，支持带 `mdi:` 前缀 */
  icon: string;
}>();

const data = computed(() => getIcon(props.icon));
</script>

<template>
  <svg
    v-if="data"
    class="inline-block align-sub"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    aria-hidden="true"
    v-html="data.body"
  />
</template>
