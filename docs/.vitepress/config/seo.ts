import type { HeadConfig, TransformContext } from 'vitepress';
import { toUrlPath } from '../support/url.js';

const SITE_ORIGIN = 'https://www.ultravires.me';
const SITE_NAME = '浅安。';

/** 去掉 HTML 标签并还原常见实体，得到纯文本 */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 为每页生成独立的 meta description 与 Open Graph / Twitter 卡片标签。
 *
 * 文章 frontmatter 未写 description 时，取正文首个段落作为摘要——
 * 按项目规范，文章正文开头即摘要段，正好用作搜索结果描述。
 */
export function seoHead(ctx: TransformContext): HeadConfig[] {
  const { content, pageData, page } = ctx;

  // 去掉引用块，避免把引文当成文章摘要
  const body = content.replace(/<blockquote>[\s\S]*?<\/blockquote>/g, ' ');
  const firstParagraph = body.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? '';
  const summary = toPlainText(firstParagraph).slice(0, 150);
  const description = pageData.frontmatter.description ?? summary;
  const title = pageData.title || ctx.title;
  const url = `${SITE_ORIGIN}${toUrlPath(page)}`;

  const head: HeadConfig[] = [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ];

  if (description) {
    // VitePress 检测到 head 中已有 description meta 时会跳过自身的默认值，
    // 因此这里显式声明即可覆盖站点级描述。
    head.unshift(['meta', { name: 'description', content: description }]);
    head.push(['meta', { property: 'og:description', content: description }]);
    head.push(['meta', { name: 'twitter:description', content: description }]);
  }

  const published = pageData.frontmatter.date;
  if (published) {
    const date = new Date(String(published).replace(/\//g, '-'));
    if (!Number.isNaN(date.getTime())) {
      head.push([
        'meta',
        {
          property: 'article:published_time',
          content: date.toISOString()
        }
      ]);
    }
  }

  return head;
}
