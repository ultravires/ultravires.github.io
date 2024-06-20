import type { Theme } from 'vitepress';
import Layout from './layout/index.vue';
import '@shikijs/vitepress-twoslash/style.css';
import './styles/tailwind.css';
import './styles/index.css';

export default {
  Layout,
} satisfies Theme;
