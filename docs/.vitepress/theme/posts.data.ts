import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { spawnSync } from 'node:child_process';
import { join, relative } from 'node:path';
import { createContentLoader } from 'vitepress';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export interface Post {
  title: string;
  url: string;
  categories: string[];
  tags: string[];
  date: {
    time: number;
    string: string;
  };
  /** 基于 Git 最后提交的更新时间，仅构建时可用 */
  lastUpdatedTime: {
    time: number;
    string: string;
  } | null;
  excerpt: string | undefined;
  cover: string | undefined;
  frontmatter: Record<string, any>;
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
    const docsSrcDir = join(process.cwd(), 'docs', 'src');
    return raw
      .map(({ url, frontmatter, excerpt }) => {
        const pathFromUrl = url.replace(/^\//, '').replace(/(\/)?$/, (_, s) => (s ? 'index' : '')) || 'index';
        const filePath = join(docsSrcDir, `${pathFromUrl}.md`);
        const lastUpdatedTime = getGitLastUpdatedTime(filePath);
        return {
          title: frontmatter.title,
          cover: frontmatter.cover,
          categories: frontmatter.categories ?? [],
          tags: frontmatter.tags ?? [],
          url,
          excerpt, // 渲染的摘录 HTML（第一个 `---` 上面的内容）
          date: formatDate(frontmatter.date),
          lastUpdatedTime,
          hidden: frontmatter.hidden || false,
          frontmatter
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
      string: dayjs().fromNow()
    };
  }

  // 统一转为字符串：去除首尾空白，将 / 替换为 -（兼容 YAML 自动解析的 Date 对象以及 2026/03/11 这类非标准格式）
  const rawStr = String(raw).trim().replace(/\//g, '-');
  const date = dayjs(rawStr);

  if (!date.isValid()) {
    return {
      time: Date.now(),
      string: dayjs().fromNow()
    };
  }

  return {
    time: date.valueOf(),
    string: date.fromNow()
  };
}

// 获取 git 最后提交时间（filePath 为绝对路径）
function getGitLastUpdatedTime(
  filePath: string | undefined
): Post['lastUpdatedTime'] {
  if (!filePath) return null;

  try {
    const relPath = relative(process.cwd(), filePath);
    const { stdout } = spawnSync(
      'git',
      ['log', '-1', '--format=%at', '--', relPath],
      { cwd: process.cwd() }
    );

    const timestamp = Number.parseInt(stdout.toString().trim(), 10) * 1000;

    if (isNaN(timestamp)) return null;

    return {
      time: timestamp,
      string: dayjs(timestamp).fromNow()
    };
  } catch (error) {
    console.warn(`无法获取文件 ${filePath} 的Git最后更新时间:`, error);
    return null;
  }
}
