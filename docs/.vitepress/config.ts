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
  markdown: zh.markdown,
  themeConfig: zh.themeConfig,
  vite: {
    define: {
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    }
  }
});
