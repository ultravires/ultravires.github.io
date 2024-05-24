import { defineConfig, type DefaultTheme } from "vitepress";
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: '“前端天花板”',
  description: '向成渝的个人博客',

  themeConfig: {
    siteTitle: '“前端天花板”',
    nav: nav(),
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 &copy; 2024-${new Date().getFullYear()} 向成渝`
    }
  },

  markdown: {
    codeTransformers: [
      transformerTwoslash() 
    ],
    theme: {
      light: 'github-light-default',
      dark: 'github-dark-default'
    },
    lineNumbers: true,
    math: true, // require `markdown-it-mathjax3`
    image: {
      lazyLoading: true
    },
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '友链',
      link: '/link/',
      activeMatch: '/link/'
    },
    {
      text: '专栏',
      items: [
        {
          text: '程序人生',
          link: '/life/',
          activeMatch: '/life/'
        },
        {
          text: '算法题解',
          link: '/algorithm/',
          activeMatch: '/algorithm/'
        },
        {
          text: '前端领域',
          link: '/front-end/',
          activeMatch: '/front-end/'
        },
        {
          text: '后端领域',
          link: '/back-end/',
          activeMatch: '/back-end/'
        },
        {
          text: '人工智能',
          link: '/ai/',
          activeMatch: '/ai/'
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