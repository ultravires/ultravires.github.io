import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { createContentLoader } from 'vitepress';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export interface Post {
  title: string;
  url: string;
  /** 相对 srcDir 的文件路径（如 ai/xxx.md），与 page.relativePath 一致 */
  relativePath: string;
  categories: string[];
  tags: string[];
  date: {
    time: number;
    string: string;
  };
  excerpt: string | undefined;
  cover: string | undefined;
  /** frontmatter.banner 原始值，供 Banner 预加载解析样式与背景图 */
  banner: unknown;
}

declare const data: Post[];
export { data };

/**
 * @link https://vitepress.dev/zh/guide/data-loading#createcontentloader
 */
export default createContentLoader('**/*.md', {
  includeSrc: false, // 包含原始 markdown 源?
  render: false, // 包含渲染的整页 HTML?
  excerpt: true, // 包含摘录?
  transform(raw): Post[] {
    // 根据需要对原始数据进行 map、sort 或 filter
    // 最终的结果是将发送给客户端的内容
    // srcDir 为 'src'，内容在 docs/src 下；url 为 /ai/how-to-use-ai（cleanUrls）
    return raw
      .map(({ url, frontmatter, excerpt }) => {
        const pathFromUrl =
          url
            .replace(/^\//, '')
            .replace(/(\/)?$/, (_, s) => (s ? 'index' : '')) || 'index';
        return {
          title: frontmatter.title,
          cover: frontmatter.cover,
          categories: frontmatter.categories ?? [],
          tags: frontmatter.tags ?? [],
          url,
          relativePath: `${pathFromUrl}.md`,
          excerpt, // 渲染的摘录 HTML（正文首个段落）
          date: formatDate(frontmatter.date),
          banner: frontmatter.banner,
          hidden: frontmatter.hidden || false
        };
      })
      .filter(({ title, hidden }) => !!title && !hidden)
      .sort((a, b) => b.date.time - a.date.time);
  }
});

export function formatDate(raw: unknown): Post['date'] {
  if (!raw) {
    return {
      time: Date.now(),
      string: dayjs().format('YYYY-MM-DD')
    };
  }

  // 统一转为字符串：去除首尾空白，将 / 替换为 -（兼容 YAML 自动解析的 Date 对象以及 2026/03/11 这类非标准格式）
  const rawStr = String(raw).trim().replace(/\//g, '-');
  const date = dayjs(rawStr);

  if (!date.isValid()) {
    return {
      time: Date.now(),
      string: dayjs().format('YYYY-MM-DD')
    };
  }

  return {
    time: date.valueOf(),
    string: date.format('YYYY-MM-DD')
  };
}
