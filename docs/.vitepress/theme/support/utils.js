import { ref } from 'vue';

const HASH_RE = /#.*$/;
const EXT_RE = /(index)?\.(md|html)$/;

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
    } else {
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

function normalize(path) {
  return decodeURI(path).replace(HASH_RE, '').replace(EXT_RE, '');
}

export function formatDate(raw) {
  // 统一转为字符串：去除首尾空白，将 / 替换为 -（兼容非标准日期格式）
  const normalized = String(raw ?? '')
    .trim()
    .replace(/\//g, '-');
  const date = new Date(normalized);
  if (isNaN(date.getTime())) {
    return null;
  }
  return {
    time: +date,
    string: `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  };
}
