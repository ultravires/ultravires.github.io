import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import { defineConfigWithTheme, type Plugin } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import { zh } from './config/zh.js';
import { genFeed } from './genFeed.js';
import type { CustomTheme } from './theme/types/custom-vitepress-theme.d.js';

// https://vitepress.vuejs.org/config/app-configs
export default defineConfigWithTheme<CustomTheme>(
  withMermaid({
    lang: zh.lang,
    title: zh.title,
    description: zh.description,
    srcDir: 'src',
    cleanUrls: true,
    buildEnd: genFeed,
    markdown: zh.markdown,
    themeConfig: zh.themeConfig,
    lastUpdated: true,
    ignoreDeadLinks: true,
    head: [
      ['meta', { name: 'author', content: '向成渝' }],
      [
        'meta',
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        }
      ],
      [
        'meta',
        {
          name: 'algolia-site-verification',
          content: '338A0D7313BC8277'
        }
      ],
      [
        'link',
        {
          rel: 'preconnect',
          href: 'https://AKWVEI7J63-dsn.algolia.net',
          crossorigin: ''
        }
      ]
    ],
    vite: {
      define: {
        // 启用生产环境构建下激活不匹配的详细警告
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
      },
      build: {
        cssCodeSplit: false
      },
      plugins: [
        svgLoader({
          svgo: false,
          defaultImport: 'component'
        }) as Plugin,
        tailwindcss() as Plugin[]
      ]
    }
  })
);
