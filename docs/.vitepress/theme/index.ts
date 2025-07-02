import '@shikijs/vitepress-twoslash/style.css';
import './styles/tailwind.css';
import './styles/doc.css';
import './styles/index.css';
import './styles/docsearch.css';

import type { Theme } from 'vitepress';
import Layout from './layout/index.vue';

export default {
  Layout,
} satisfies Theme;
