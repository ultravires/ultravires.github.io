import { onBeforeUnmount, onMounted } from 'vue';
import { data as posts } from '../posts.data';
import {
  preloadBannerImage,
  resolveBannerImage,
  resolveBannerStyle
} from '../support/banner';

// 文章 url -> Banner 背景图地址，仅 image 风格需要预加载
let bannerUrls: Map<string, string> | null = null;

function getBannerUrls(): Map<string, string> {
  if (!bannerUrls) {
    bannerUrls = new Map();
    for (const post of posts) {
      const banner = post.frontmatter?.banner;
      if (resolveBannerStyle(banner) !== 'image') continue;
      bannerUrls.set(post.url, resolveBannerImage(banner, post.relativePath));
    }
  }
  return bannerUrls;
}

function resolvePostUrl(target: EventTarget | null): string | null {
  const anchor = (target as HTMLElement | null)?.closest?.('a[href]');
  const rawHref = anchor?.getAttribute('href');
  if (!rawHref || rawHref.startsWith('//')) return null;

  let path = rawHref;
  if (rawHref.startsWith('http')) {
    try {
      const url = new URL(rawHref);
      if (url.origin !== location.origin) return null;
      path = url.pathname;
    } catch {
      return null;
    }
  }
  path = path.replace(/[?#].*$/, '').replace(/\/$/, '') || '/';
  const urls = getBannerUrls();
  return urls.has(path) ? path : null;
}

function onEvent(event: Event) {
  const url = resolvePostUrl(event.target);
  if (url) preloadBannerImage(getBannerUrls().get(url)!);
}

/**
 * 悬停/触摸/聚焦文章链接时预加载其 Banner 背景图，
 * 点击跳转时图片已在缓存中，交叉淡入可以立即开始。
 */
export function useBannerPreload() {
  onMounted(() => {
    // pointerenter 不冒泡，需在捕获阶段监听
    document.addEventListener('pointerenter', onEvent, true);
    document.addEventListener('touchstart', onEvent, {
      capture: true,
      passive: true
    });
    document.addEventListener('focusin', onEvent, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('pointerenter', onEvent, true);
    document.removeEventListener('touchstart', onEvent, true);
    document.removeEventListener('focusin', onEvent, true);
  });
}
