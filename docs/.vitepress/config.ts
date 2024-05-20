import type { DefaultTheme } from 'vitepress';
import { defineConfig } from 'vitepress';
import { genFeed } from './genFeed.js';
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';

const themeConfig: DefaultTheme.Config = {
  siteTitle: '“前端天花板”',
  nav: [
    {
      text: '友链',
      link: '/link/'
    },
    {
      text: '专栏',
      items: [
        {
          text: '程序人生',
          link: '/life/'
        },
        {
          text: '算法题解',
          link: '/algorithm/'
        },
        {
          text: '前端领域',
          link: '/front-end/'
        },
        {
          text: '后端领域',
          link: '/back-end/'
        },
        {
          text: '人工智能',
          link: '/ai/'
        }
      ]
    },
    {
      text: '关于',
      link: '/about/'
    }
  ]
};

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: '“前端天花板”',
  description: '向成渝的个人博客',
  srcDir: 'src',
  cleanUrls: true,
  buildEnd: genFeed,
  markdown: {
    codeTransformers: [
      transformerTwoslash() 
    ],
    theme: {
      light: 'github-light-default',
      dark: 'github-dark-default'
    },
    lineNumbers: false
  },
  themeConfig,
  vite: {
    build: {
      minify: false
    }
  }
});
