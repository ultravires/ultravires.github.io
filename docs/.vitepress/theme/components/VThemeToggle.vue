<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, toRefs, watch } from 'vue';
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

const dark = useDark();

function useDark() {
  const system = usePreferDark();
  const setting = useLocalStorage('setting-dark', themeConfig.value.dark);
  const dark = computed({
    get() {
      return setting.value === 'auto'
        ? system.value
        : setting.value === themeConfig.value.dark;
    },
    set(val) {
      if (val === system.value) {
        setting.value = 'auto';
      } else {
        setting.value = val ? themeConfig.value.dark : themeConfig.value.light;
      }
    }
  });
  watch(
    dark,
    (val) => {
      const root = document.documentElement;
      root.dataset.theme = val
        ? themeConfig.value.dark
        : themeConfig.value.light;
    },
    {
      immediate: true
    }
  );
  return dark;
}

function usePreferDark() {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const dark = ref(media.matches);
  const update = () => (dark.value = media.matches);
  media.addEventListener('change', update);
  onUnmounted(() => {
    media.removeEventListener('change', update);
  });
  return dark;
}

function useLocalStorage(key: string, defaultValue: string) {
  const data = ref(localStorage.getItem(key) ?? defaultValue);
  watch(data, () => localStorage.setItem(key, data.value));
  return data;
}

// 惰性函数
let toggleTheme = (event: MouseEvent) => {
  if (!document.startViewTransition) {
    toggleTheme = (event) => {
      dark.value = !dark.value;
    };
  } else {
    toggleTheme = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );

      const transition = document.startViewTransition?.(async () => {
        dark.value = !dark.value;
        await nextTick();
      });

      transition?.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: dark.value ? clipPath : clipPath.reverse()
          },
          {
            duration: 500,
            easing: 'ease-in',
            pseudoElement: dark.value
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)'
          }
        );
      });
    };
  }
  toggleTheme(event);
};
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

<style>
@layer view-transitions {
  @layer no-root {
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
  }

  @layer light {
    [data-theme='light']::view-transition-old(root) {
      z-index: 9999;
    }

    [data-theme='light']::view-transition-new(root) {
      z-index: 1;
    }
  }

  @layer dark {
    [data-theme='dark']::view-transition-old(root) {
      z-index: 1;
    }

    [data-theme='dark']::view-transition-new(root) {
      z-index: 9999;
    }
  }
}
</style>
