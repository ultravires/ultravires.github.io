import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { createContentLoader } from 'vitepress';
import { basename } from 'node:path';
import { spawnSync } from 'node:child_process';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn')

export interface Post {
  title: string;
  url: string;
  categories: string[];
  tags: string[];
  date: {
    time: number;
    string: string;
  };
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
    return raw
      .map(({ url, frontmatter, excerpt, src }) => ({
        title: frontmatter.title,
        cover: frontmatter.cover,
        categories: frontmatter.categories ?? [],
        tags: frontmatter.tags ?? [],
        url,
        excerpt, // 渲染的摘录 HTML（第一个 `---` 上面的内容）
        date: getGitLastUpdatedTime(src) || formatDate(frontmatter.date),
        hidden: frontmatter.hidden || false,
        frontmatter: frontmatter, // 原始 frontmatter 对象
      }))
      .filter(({ title, hidden }) => !!title && !hidden)
      .sort((a, b) => b.date.time - a.date.time);
  }
});

export function formatDate(raw: string): Post['date'] {
  if (!raw) {
    return {
      time: Date.now(),
      string: dayjs().fromNow()
    };
  }
  
  const date = new Date(raw);
  date.setUTCHours(8);
  return {
    time: +date,
    string: dayjs(date).fromNow(),
  };
}

function getGitLastUpdatedTime(filePath: string | undefined): Post['date'] | null {
  if (!filePath) return null;
  
  try {
    // 获取文件的git最后提交时间
    const { stdout } = spawnSync(
      'git',
      ['log', '-1', '--format=%at', basename(filePath)],
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