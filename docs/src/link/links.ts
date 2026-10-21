export interface FriendLink {
  /** 站点名称 */
  name: string;
  /** 完整地址（含协议） */
  url: string;
  /** 一句话简介 */
  description: string;
  /** 可选标签，参与搜索 */
  tags?: string[];
  /** 可选头像图片地址，缺省时按名称生成首字符徽标 */
  avatar?: string;
}

/**
 * 友链数据。新增/修改在此文件进行，页面热更新生效。
 */
export const friendLinks: FriendLink[] = [
  {
    name: 'Vue',
    url: 'https://cn.vuejs.org/',
    description: '渐进式 JavaScript 框架',
    tags: ['前端', '框架']
  },
  {
    name: 'ECharts',
    url: 'https://echarts.apache.org/zh/index.html',
    description: '一个基于 JavaScript 的开源可视化图表库',
    tags: ['前端', '可视化']
  },
  {
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/zh-CN/',
    description: 'Web 平台技术的参考文档',
    tags: ['文档', '前端']
  },
  {
    name: 'Can I Use',
    url: 'https://caniuse.com/',
    description: '查询 Web 特性的浏览器支持情况',
    tags: ['工具', '前端']
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/zh/',
    description: '带有类型语法的 JavaScript',
    tags: ['文档', '语言']
  },
  {
    name: 'VitePress',
    url: 'https://vitepress.dev/zh/',
    description: '由 Vite 和 Vue 驱动的静态站点生成器，本站基于它构建',
    tags: ['工具', '文档']
  },
  {
    name: 'GitHub',
    url: 'https://github.com/',
    description: '托管代码，协作开发',
    tags: ['社区']
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/',
    description: '程序员问答社区',
    tags: ['社区']
  }
];
