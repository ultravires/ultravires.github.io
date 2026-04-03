<script setup lang="ts">
import { toRefs } from 'vue';
import { useTheme } from '../composables/useTheme';
import VIconMoon from '../assets/svg/moon.svg?component';
import VIconSun from '../assets/svg/sun.svg?component';

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
  <div
    class="custom-toggle-theme inline-flex cursor-pointer items-center justify-center"
    @click="toggleTheme"
  >
    <slot>
      <VIconSun v-show="dark" />
      <VIconMoon v-show="!dark" />
    </slot>
  </div>
</template>
