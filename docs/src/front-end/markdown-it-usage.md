---
title: MarkdownIt 的使用方式
date: 2025-12-09 15:13:50
cover:
  text: MarkdownIt
banner:
  wave: true
categories:
  - 前端领域
---

在工作中经常用到 markdown-it 这个库, 在此记录在使用 markdown-it 库时遇到的一些问题及解决方案。

---

## 使用 frontmatter 插件

[markdown-it-front-matter](https://github.com/parksb/markdown-it-front-matter) 插件作者没有提供如何自定义渲染的文档，这里通过查看源码找到了正确的使用方式，在此记录一下。

```javascript
md.use(markdownItFrontMatter, (fm) => {
  md.renderer.rules.front_matter = function (tokens, idx) {
    return `<pre class="front-matter">${fm}</pre>`;
  };
});
```

- [ ] 使用 typescript 重写插件并发布到 npm
