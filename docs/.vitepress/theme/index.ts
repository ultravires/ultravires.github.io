import '@shikijs/vitepress-twoslash/style.css';
import './styles/tailwind.css';
import './styles/index.css';

import type { Theme } from 'vitepress';
import Layout from './layout/index.vue';

console.log(
  '%c 邮箱 %c x555666777@qq.com',
  "background-color: green; border: 1px solid green;",
  'padding: 0 6px; background-color: transparent; border: 1px solid green;'
);

console.log(
  '%c ',
  'padding: 100px; font-size: 0; background: url("/WeChatPay.jpg") no-repeat contain;'
);

export default {
  Layout,
} satisfies Theme;
