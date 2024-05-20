import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
}

declare const data: Post[]
export { data }

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
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt, // 渲染的摘录 HTML（第一个 `---` 上面的内容）
        date: formatDate(frontmatter.date)
      }))
      .filter(({ title }) => (!!title))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(8)
  return {
    time: +date,
    string: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate().toString().padStart(2, '0'))}`
  }
}
