<script lang="ts" setup>
import { computed } from 'vue';
import { encode } from 'uqr';

interface Props {
  /** 二维码内容 */
  text: string;
  /** 四周留白宽度（单位：模块数） */
  margin?: number;
}

const props = withDefaults(defineProps<Props>(), {
  margin: 2
});

const qrcode = computed(() => {
  const { data, size } = encode(props.text);
  let d = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (data[y][x]) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return { d, size };
});
</script>

<template>
  <svg
    :viewBox="`${-margin} ${-margin} ${qrcode.size + margin * 2} ${qrcode.size + margin * 2}`"
    class="rounded-md bg-white"
    shape-rendering="crispEdges"
    role="img"
    aria-label="二维码"
  >
    <path
      :d="qrcode.d"
      fill="#000"
    />
  </svg>
</template>
