import { defineConfig } from 'vitepress';
import { genFeed } from './genFeed.js';
import { zh } from './config/zh.js';

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  lang: zh.lang,
  title: zh.title,
  description: zh.description,
  srcDir: 'src',
  cleanUrls: true,
  buildEnd: genFeed,
  markdown: zh.markdown,
  themeConfig: zh.themeConfig,
  head: [
    ['meta', { name: 'author', content: '向成渝' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }],
    ['link', { rel: 'preconnect', href: 'https://AKWVEI7J63-dsn.algolia.net', crossorigin: '' }]
  ],
  vite: {
    define: {
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    }
  }
});
