import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: '“前端天花板”',
  description: '向成渝的个人博客',

  themeConfig: {
    siteTitle: '“前端天花板”',
    nav: nav()
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