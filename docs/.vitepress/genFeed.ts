import path from 'node:path';
import { writeFileSync } from 'node:fs';
import { Feed } from 'feed';
import { createContentLoader, type SiteConfig } from 'vitepress';
import { zh } from './config/zh.js';

const SITE_ORIGIN = 'https://ultravires.github.io';

function siteRoot(config: SiteConfig): string {
  const base = config.site.base.replace(/\/?$/, '');
  return `${SITE_ORIGIN}${base}`;
}

function parsePostDate(raw: unknown): Date {
  if (raw === undefined || raw === null || raw === '') {
    return new Date();
  }
  // 统一日期格式：去除首尾空白，将 / 替换为 -（兼容非标准日期格式）
  const normalized = String(raw).trim().replace(/\//g, '-');
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export async function genFeed(config: SiteConfig) {
  const root = siteRoot(config);

  const feed = new Feed({
    title: zh.title,
    description: zh.description,
    id: root,
    link: root,
    language: zh.lang,
    favicon: `${root}/favicon.ico`,
    copyright: `版权所有 © 2024-${new Date().getFullYear()} 向成渝`,
    generator: 'https://github.com/jpmonette/feed',
  });

  const posts = await createContentLoader('**/*.md', {
    excerpt: true,
    // 全文 md.render 会经过 twoslash 等扩展，缺少页面路径时会报错；订阅摘要用 excerpt 即可
    render: false,
    transform(raw) {
      return raw.filter((page) => {
        const fm = page.frontmatter;
        return Boolean(fm.title) && !fm.hidden;
      });
    },
  }).load();

  posts.sort(
    (a, b) =>
      +parsePostDate(b.frontmatter.date) -
      +parsePostDate(a.frontmatter.date)
  );

  for (const { url, excerpt, frontmatter } of posts) {
    const link = `${root}${url}`;
    const date = parsePostDate(frontmatter.date);
    const authorName =
      typeof frontmatter.author === 'string' && frontmatter.author.trim()
        ? frontmatter.author.trim()
        : '向成渝';

    feed.addItem({
      title: String(frontmatter.title),
      id: link,
      link,
      description: excerpt,
      content: excerpt?.replaceAll('&ZeroWidthSpace;', ''),
      author: [
        {
          name: authorName,
          ...(frontmatter.twitter
            ? {
                link: `https://twitter.com/${String(frontmatter.twitter).replace(/^@/, '')}`,
              }
            : {}),
        },
      ],
      date,
    });
  }

  const outFile = path.join(config.outDir, 'feed.rss');
  writeFileSync(outFile, feed.rss2(), 'utf-8');
}
