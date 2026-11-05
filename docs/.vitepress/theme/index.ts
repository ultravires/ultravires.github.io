import '@shikijs/vitepress-twoslash/style.css';
import './styles/index.css';

import type { Theme } from 'vitepress';
import { defineAsyncComponent } from 'vue';
import Layout from './layout/index.vue';

export default {
  Layout,
  enhanceApp({ app }) {
    // Mermaid 组件异步加载：mermaid core 及其各类图表 chunk 不会进入 app
    // 入口的依赖图，VitePress 便不会把它们写进每页的 modulepreload 列表。
    app.component(
      'Mermaid',
      defineAsyncComponent(() => import('./components/Mermaid.vue'))
    );
  }
} satisfies Theme;
