import type { DefaultTheme } from "vitepress";

export interface CustomTheme extends DefaultTheme.Config {
}

// 添加全局常量的类型声明
declare global {
  const __ALGOLIA__: boolean;
  const __VP_LOCAL_SEARCH__: boolean;
}