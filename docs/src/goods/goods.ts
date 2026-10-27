export interface Good {
  /** 物品名称 */
  name: string;
  /** 物品信息，一句话规格/定位，如「人体工学键盘」 */
  info: string;
  /** 物品描述 */
  description: string;
  /** 物品分类，如「生产力」，同名字段自动聚合成筛选标签 */
  category: string;
  /** 物品图片地址（1x） */
  image: string;
  /** 可选 2x 图片地址，用于高分屏 srcset */
  image2x?: string;
}

/**
 * 好物数据。新增/修改在此文件进行，页面热更新生效。
 */
export const goods: Good[] = [
  {
    name: 'Logi Wave Keys',
    info: '人体工学键盘',
    description: '挺好看的一款无线键盘，轻度符合人体工学、上手简单。',
    category: '生产力',
    image:
      'https://resource.logitech.com/w_416,h_312,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/wave-keys/2025/wave-keys-top-angle-offwhite-gallery-1.png',
    image2x:
      'https://resource.logitech.com/w_416,h_312,ar_4:3,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/wave-keys/2025/wave-keys-top-angle-offwhite-gallery-1.png'
  },
  {
    name: 'Logi PRO X2 SUPERSTRIKE',
    info: '电竞游戏鼠标',
    description: '双十一九百多抢购的，全新未拆封，准备挂闲鱼卖掉。',
    category: '生产力',
    image:
      'https://resource.logitechg.com/w_416,h_312,ar_4:3,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x2-superstrike-pdp/2026/pro-x2-superstrike-top-angle-lifestyle-gallery-2.png',
    image2x:
      'https://resource.logitechg.com/w_416,h_312,ar_4:3,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-x2-superstrike-pdp/2026/pro-x2-superstrike-top-angle-lifestyle-gallery-2.png'
  }
];
