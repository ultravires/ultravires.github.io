// 扩展 Document 接口，添加 startViewTransition 的类型声明
interface Document {
  /**
   * 浏览器视图过渡 API，用于实现流畅的元素切换动画
   * @param callback 过渡过程中执行的回调（通常是修改 DOM/更新视图的逻辑）
   * @returns 过渡过程中包含的对象
   */
  startViewTransition?(callback: () => Promise<void> | void): {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skip: () => void;
  };
}

// 单文件组件（.vue）在 tsc 下没有类型信息，统一按任意模块处理。
// 需要对 .vue 内部做类型检查时可改用 vue-tsc。
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
