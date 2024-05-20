import Layout from './layout/index.vue';
import '@shikijs/vitepress-twoslash/style.css';
import './styles/tailwind.css';
import './styles/index.css';
import type { EnhanceAppContext, Theme } from 'vitepress';

export default {
  Layout,
  async enhanceApp({ app }: EnhanceAppContext) {
    if (!import.meta.env.SSR) {
      const TwoslashFloatingVue = await import('@shikijs/vitepress-twoslash/client');
      app.use(TwoslashFloatingVue.default);
    }
  }
} satisfies Theme;
