<script setup lang="ts">
import { toRefs } from 'vue';
import { useTheme } from '../composables/useTheme';
import VIconMoon from '../assets/svg/moon.svg?component';
import VIconSun from '../assets/svg/sun.svg?component';
import VTooltip from './VTooltip.vue';

interface Props {
  themeConfig: {
    dark: 'dark';
    light: 'light';
  };
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * 主题配置
   */
  themeConfig: () => ({
    /** 暗黑模式下的类名 */
    dark: 'dark',
    /** 亮色模式下的类名 */
    light: 'light'
  })
});

const { themeConfig } = toRefs(props);

const { dark, toggleTheme } = useTheme(themeConfig.value);
</script>

<template>
  <VTooltip
    :content="dark ? '亮色主题' : '暗黑主题'"
    class="custom-toggle-theme cursor-pointer justify-center"
    @click="toggleTheme"
  >
    <slot>
      <VIconSun v-show="dark" />
      <VIconMoon v-show="!dark" />
    </slot>
  </VTooltip>
</template>
