export interface OutlineHeader {
  element: HTMLElement;
  title: string;
  link: string;
  level: number;
  children?: OutlineHeader[];
}

/** 目录层级范围：false 关闭，number 指定层级，'deep' 表示 2-6 级，[min, max] 自定义 */
export type OutlineRange =
  | false
  | number
  | 'deep'
  | [number, number]
  | { level: number | 'deep' | [number, number] };

function serializeHeader(h: Element): string {
  let ret = '';
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      const el = node as Element;
      if (
        el.classList.contains('VPBadge') ||
        el.classList.contains('header-anchor') ||
        el.classList.contains('ignore-header')
      ) {
        continue;
      }
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}

/** 把扁平的标题列表按层级嵌套成目录树 */
export function resolveHeaders(
  headers: OutlineHeader[],
  range: OutlineRange
): OutlineHeader[] {
  if (range === false) {
    return [];
  }

  const levelsRange =
    (typeof range === 'object' && !Array.isArray(range)
      ? range.level
      : range) || 2;
  const [high, low] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
        ? [2, 6]
        : levelsRange;

  const filtered = headers.filter((h) => h.level >= high && h.level <= low);

  const ret: OutlineHeader[] = [];
  outer: for (let i = 0; i < filtered.length; i++) {
    const cur = filtered[i];
    if (i === 0) {
      ret.push(cur);
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = filtered[j];
        if (prev.level < cur.level) {
          (prev.children || (prev.children = [])).push(cur);
          continue outer;
        }
      }
      ret.push(cur);
    }
  }
  return ret;
}

/** 读取正文中的标题，作为文章目录数据源 */
export function getHeaders(range: OutlineRange): OutlineHeader[] {
  const headers = [
    ...document.querySelectorAll<HTMLElement>(
      '.VPDoc :where(h1,h2,h3,h4,h5,h6)'
    )
  ]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => ({
      element: el,
      title: serializeHeader(el),
      link: '#' + el.id,
      level: Number(el.tagName[1])
    }));

  return resolveHeaders(headers, range);
}
