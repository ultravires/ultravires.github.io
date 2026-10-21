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
    name: 'iMarkr',
    url: 'https://www.imarkr.com/',
    description: 'Jun 的个人博客',
    tags: ['博客'],
    avatar: '/links/imarkr.svg'
  }
];
