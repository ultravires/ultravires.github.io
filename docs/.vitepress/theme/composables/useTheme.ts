import { computed, nextTick, onUnmounted, ref, watch } from 'vue';

export interface ThemeConfig {
  dark: string;
  light: string;
}

export function useTheme(
  themeConfig: ThemeConfig = { dark: 'dark', light: 'light' }
) {
  const dark = useDark(themeConfig);

  // 惰性函数
  // 惰性函数内部状态
  let doToggle = (event: MouseEvent) => {
    if (typeof document === 'undefined') return;
    
    if (!document.startViewTransition) {
      doToggle = (event) => {
        dark.value = !dark.value;
      };
    } else {
      doToggle = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
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
              duration: 200,
              easing: 'ease-in',
              pseudoElement: dark.value
                ? '::view-transition-new(root)'
                : '::view-transition-old(root)'
            }
          );
        });
      };
    }
    doToggle(event);
  };

  const toggleTheme = (event: MouseEvent) => doToggle(event);

  return {
    dark,
    toggleTheme
  };
}

function useDark(themeConfig: ThemeConfig) {
  const system = usePreferDark();
  const setting = useLocalStorage('setting-dark', themeConfig.dark);
  const dark = computed({
    get() {
      return setting.value === 'auto'
        ? system.value
        : setting.value === themeConfig.dark;
    },
    set(val) {
      if (val === system.value) {
        setting.value = 'auto';
      } else {
        setting.value = val ? themeConfig.dark : themeConfig.light;
      }
    }
  });
  watch(
    dark,
    (val) => {
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.dataset.theme = val ? themeConfig.dark : themeConfig.light;
      }
    },
    { immediate: true }
  );
  return dark;
}

function usePreferDark() {
  const dark = ref(false);
  
  if (typeof window !== 'undefined') {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    dark.value = media.matches;
    const update = () => (dark.value = media.matches);
    media.addEventListener('change', update);
    onUnmounted(() => {
      media.removeEventListener('change', update);
    });
  }
  
  return dark;
}

function useLocalStorage(key: string, defaultValue: string) {
  const data = ref(
    (typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null) ?? defaultValue
  );
  watch(data, () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, data.value);
    }
  });
  return data;
}
