/**
 * 文章 Banner 风格解析与工具函数。
 *
 * frontmatter 支持以下写法：
 *
 * ```yaml
 * banner: true                 # 等价于 style: particle
 * banner: gradient             # 字符串简写
 * banner:
 *   style: particle            # particle | gradient | image
 *   theme: royal               # 可选，gradient 风格的配色主题
 *   image: https://...         # 可选，image 风格的自定义背景图（缺省使用 picsum 随机图）
 *   blur: true                 # 可选，image 风格背景模糊
 *   wave: true                 # 可选，底部波浪
 * ```
 */
export const BANNER_STYLES = ['particle', 'gradient', 'image'];

export function resolveBannerStyle(banner) {
  if (!banner) return null;
  if (banner === true) return 'particle';
  if (typeof banner === 'string') return banner;
  if (banner.style) return banner.style;
  if (banner.image) return 'image';
  return 'particle';
}

/** 稳定字符串哈希，用于按文章生成确定性随机种子。 */
export function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * 解析 image 风格 Banner 的背景图地址：
 * 自定义图片优先，否则按 key（通常为文章相对路径）生成 picsum 稳定随机图。
 */
export function resolveBannerImage(banner, key) {
  if (typeof banner?.image === 'string' && banner.image) return banner.image;
  return `https://picsum.photos/seed/${hashString(key || 'post')}/1920/640`;
}

const preloadedUrls = new Set();

/**
 * 预加载 Banner 背景图写入浏览器缓存。
 * 配合文章链接的悬停/触摸预取，切换文章时新图已在缓存中，淡入可立即开始。
 */
export function preloadBannerImage(url) {
  if (!url || preloadedUrls.has(url)) return;
  if (typeof navigator !== 'undefined' && navigator.connection?.saveData) return;
  preloadedUrls.add(url);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
}
