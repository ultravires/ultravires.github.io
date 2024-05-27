import { defineConfig } from 'vitepress';
import { genFeed } from './genFeed.js';
import { zh } from './config/zh.js';

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: zh.title,
  description: zh.description,
  srcDir: 'src',
  cleanUrls: true,
  buildEnd: genFeed,
  transformHead({ assets }) {
    // 相应地调整正则表达式以匹配字体
    const myFontFile = assets.find(file => /font-name\.\w+\.woff2/)
    if (myFontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: myFontFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  },
  markdown: zh.markdown,
  themeConfig: zh.themeConfig,
  vite: {
    define: {
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    }
  }
});
