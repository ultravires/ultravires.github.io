import { transformerTwoslash } from '@shikijs/vitepress-twoslash';
import { defineConfigWithTheme, type DefaultTheme } from 'vitepress';
import type { CustomTheme } from '../theme/types/custom-vitepress-theme.d.ts';

export const zh = defineConfigWithTheme<CustomTheme>({
  lang: 'zh-Hans',
  title: '浅安。 | 专注计算机科学与技术',
  description: '向成渝的个人博客',

  themeConfig: {
    siteTitle: '浅安。',
    nav: nav(),
    footer: footer(),
    outline: 'deep',
    aside: 'left',
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full'
      }
    }
  },

  markdown: {
    codeTransformers: [transformerTwoslash()],
    theme: {
      light: 'one-light',
      dark: 'dark-plus'
    },
    lineNumbers: true,
    math: true, // require `markdown-it-mathjax3`
    image: {
      lazyLoading: true
    },
    codeCopyButtonTitle: '复制代码',
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    config(md) {}
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '友链',
      link: '/link/',
      activeMatch: `^/link/`
    },
    {
      text: '专栏',
      activeMatch: `^/(life|algorithm|front-end|back-end|ai)/`,
      items: [
        {
          text: '程序人生',
          link: '/life/',
          activeMatch: `^/life/`
        },
        {
          text: '算法题解',
          link: '/algorithm/',
          activeMatch: `^/algorithm/`
        },
        {
          text: '前端领域',
          link: '/front-end/',
          activeMatch: `^/front-end/`
        },
        {
          text: '后端领域',
          link: '/back-end/',
          activeMatch: `^/back-end/`
        },
        {
          text: '人工智能',
          link: '/ai/',
          activeMatch: `^/ai/`
        }
      ]
    },
    {
      text: '关于',
      link: '/about/',
      activeMatch: '/about/'
    }
  ];
}

function footer(): DefaultTheme.Footer {
  return {
    message: '基于 MIT 许可发布',
    copyright: `版权所有 &copy; 2024-${new Date().getFullYear()} 向成渝`
  };
}
