import { ref } from 'vue';
import { withBase, useData } from 'vitepress';
export const HASH_RE = /#.*$/;
export const EXT_RE = /(index)?\.(md|html)$/;
const inBrowser = typeof window !== 'undefined';
const hashRef = ref(inBrowser ? location.hash : '');
export function throttleAndDebounce(fn, delay) {
    let timeoutId;
    let called = false;
    return () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (!called) {
            fn();
            called = true;
            setTimeout(() => {
                called = false;
            }, delay);
        }
        else {
            timeoutId = setTimeout(fn, delay);
        }
    };
}
export function isActive(currentPath, matchPath, asRegex = false) {
    if (matchPath === undefined) {
        return false;
    }
    currentPath = normalize(`/${currentPath}`);
    if (asRegex) {
        return new RegExp(matchPath).test(currentPath);
    }
    if (normalize(matchPath) !== currentPath) {
        return false;
    }
    const hashMatch = matchPath.match(HASH_RE);
    if (hashMatch) {
        return hashRef.value === hashMatch[0];
    }
    return true;
}
export function ensureStartingSlash(path) {
    return /^\//.test(path) ? path : `/${path}`;
}
export function normalize(path) {
    return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '');
}
export function normalizeLink(url) {
    if (isExternal(url)) {
        return url;
    }
    const { site } = useData();
    const { pathname, search, hash } = new URL(url, 'http://example.com');
    const normalizedPath = pathname.endsWith('/') || pathname.endsWith('.html')
        ? url
        : `${pathname.replace(/(\.md)?$/, site.value.cleanUrls === 'disabled' ? '.html' : '')}${search}${hash}`;
    return withBase(normalizedPath);
}
export function isSSR() {
    return import.meta.env.SSR;
}
export function getImageColor(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
 
    const context = canvas.getContext("2d");
 
    context.drawImage(img, 0, 0);
 
    // 获取像素数据
    const data = context.getImageData(0, 0, img.width, img.height).data;
 
    // 取所有像素的平均值
    for (let row = 0; row < img.height; row++) {
        for (let col = 0; col < img.width; col++) {
            r += data[((img.width * row) + col) * 4];
            g += data[((img.width * row) + col) * 4 + 1];
            b += data[((img.width * row) + col) * 4 + 2];
        }
    }
 
    // 求取平均值
    r /= (img.width * img.height);
    g /= (img.width * img.height);
    b /= (img.width * img.height);
 
    // 将最终的值取整
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
 
    return "rgb(" + r + "," + g + "," + b + ")";
}