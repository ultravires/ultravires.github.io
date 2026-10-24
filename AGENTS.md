# 项目说明

这是一个基于 VitePress 的个人技术博客，内容涵盖程序人生、前端、后端、算法、AI 等领域。

## 文章规范

### Frontmatter

每篇文章开头必须包含 YAML frontmatter，用于描述文章的元数据信息。至少需要包含以下字段：

- `title`：文章标题
- `date`：文章日期，格式为 `YYYY-MM-DD` 或 `YYYY-MM-DD HH:mm:ss`
- `categories`: 文章分类

可选字段包括 `tags`、`cover`、`banner` 等。

### 文章 Banner

`banner` 用于配置文章顶部横幅，支持三种风格（组件位于 `docs/.vitepress/theme/components/`，解析逻辑见 `docs/.vitepress/theme/support/banner.js`）：

```yaml
banner:
  style: particle  # particle（WebGL 粒子）| gradient（文艺渐变）| image（背景图）
  theme: royal     # 可选，gradient 配色：royal / mauve / forest / lawrencium / aubergine / skies
  image: https://... # 可选，image 风格自定义背景图，缺省使用 picsum 稳定随机图
  blur: true       # 可选，image 风格背景模糊
  wave: true       # 可选，底部波浪
```

也可简写为 `banner: true`（等价 particle）或 `banner: gradient`。

### 摘要与分割线

每篇文章的正文开头必须包含一段简短摘要（1-3 句话），用于概括文章的核心内容或目标读者可以从中获得什么。摘要与后续正文之间使用 Markdown 分割线语法 `---` 进行分隔。

示例：

```markdown
---
title: 文章标题
date: 2026-01-01
categories:
  - 程序人生
---

这是一段简短的文章摘要，介绍本文将要讨论的核心内容。

---

## 第一个章节

正文从这里开始...
```

## 时刻（Moments）

「时刻」用于发布瞬时心情或日常碎片，不是正式文章，不会进入首页文章列表、搜索与 RSS。

发布方式：编辑 `docs/src/moments/moments.ts`，在 `moments` 数组**顶部**追加一条记录：

```ts
{
  date: '2026-09-24 21:30', // 发布时间，格式 'YYYY-MM-DD HH:mm'
  content: '内容，支持 Markdown',
  tags: ['日常'] // 可选
}
```

页面入口为 `/moments/`，对应 `docs/src/moments/index.md`（`layout: moments` + `hidden: true`，勿改动这两个字段）。

## 友链（Friend Links）

友链页展示常去的站点与朋友们的博客，支持搜索与随机访问。

维护方式：编辑 `docs/src/link/links.ts`，在 `friendLinks` 数组中追加一条记录：

```ts
{
  name: '站点名称',
  url: 'https://example.com/', // 完整地址，含协议
  description: '一句话简介',
  tags: ['前端'] // 可选，参与搜索
}
```

头像按名称自动生成首字符徽标，也可显式指定 `avatar` 图片地址覆盖。

页面入口为 `/link/`，对应 `docs/src/link/index.md`（`layout: link` + `hidden: true`，勿改动这两个字段）。
