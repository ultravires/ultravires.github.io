import { ref } from 'vue';

const isOpen = ref(false);

/**
 * 搜索弹窗的全局开关状态（模块级单例），
 * 供导航栏触发按钮与 VSearchBox 弹窗组件共用。
 */
export function useSearch() {
  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, open, close };
}
