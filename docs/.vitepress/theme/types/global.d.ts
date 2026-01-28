// 扩展 Document 接口，添加 startViewTransition 的类型声明
interface Document {
  /**
   * 浏览器视图过渡 API，用于实现流畅的元素切换动画
   * @param callback 过渡过程中执行的回调（通常是修改 DOM/更新视图的逻辑）
   * @returns 视图过渡对象，包含过渡的状态和方法
   */
  startViewTransition?(callback: () => Promise<void> | void): {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skip: () => void;
  };
}
