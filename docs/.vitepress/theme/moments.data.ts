import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import { join } from 'node:path';
import { createMarkdownRenderer } from 'vitepress';
import moments from '../../src/moments/moments';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export interface MomentItem {
  date: {
    time: number;
    string: string;
    /** 相对时间，如「3 小时前」，仅构建时可用 */
    fromNow: string;
  };
  /** 渲染后的内容 HTML */
  html: string;
  tags: string[];
}

declare const data: MomentItem[];
export { data };

/**
 * @link https://vitepress.dev/zh/guide/data-loading
 */
export default {
  // 数据文件变更时 dev 热更新（相对于 VitePress root，即 docs/）
  watch: ['src/moments/moments.ts'],
  async load(): Promise<MomentItem[]> {
    const srcDir = join(process.cwd(), 'docs', 'src');
    // shiki 主题与站点 markdown 配置保持一致
    const md = await createMarkdownRenderer(srcDir, {
      theme: {
        light: 'one-light',
        dark: 'dark-plus'
      },
      image: {
        lazyLoading: true
      }
    });

    return moments
      .map(({ date, content, tags }) => {
        const time = dayjs(String(date).trim().replace(/\//g, '-'));
        return {
          date: {
            time: time.valueOf(),
            string: time.format('YYYY-MM-DD HH:mm'),
            fromNow: time.fromNow()
          },
          html: md.render(content),
          tags: tags ?? []
        };
      })
      .sort((a, b) => b.date.time - a.date.time);
  }
};
