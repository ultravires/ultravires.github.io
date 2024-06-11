import { defineConfig, type DefaultTheme } from "vitepress";
import { transformerTwoslash } from '@shikijs/vitepress-twoslash';

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: '向成渝 | 专注计算机科学与技术',
  description: '向成渝的个人博客',

  themeConfig: {
    siteTitle: '浅安。',
    avatar: '/minion.png',
    nav: nav(),
    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 &copy; 2024-${new Date().getFullYear()} 向成渝`
    },
    outline: 'deep',
    aside: 'left',
    search: {
      provider: 'algolia',
      options: {
        appId: 'AKWVEI7J63',
        indexName: 'ultravires.github.io',
        apiKey: '7a14faa733a46057d98726e018afe153',
        locales: {
          zh: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
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
    lineNumbers: false,
    math: true, // require `markdown-it-mathjax3`
    image: {
      lazyLoading: false
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