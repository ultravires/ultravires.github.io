---
title: 自定义 MarkdownIt 的 mermaid 插件
cover:
  text: markdown-it-mermaid
banner:
  wave: true
categories:
  - 前端领域
---

```typescript
import MarkdownIt, { Options } from 'markdown-it';
import { escapeHtml, unescapeAll } from 'markdown-it/lib/common/utils.mjs';
import type Renderer from 'markdown-it/lib/renderer.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type Token from 'markdown-it/lib/token.mjs';
import mermaid, { MermaidConfig, RenderOptions } from 'mermaid';

export default async function markdownItMermaid(md: MarkdownIt, options: RenderOptions = {}) {
  // 默认的 fence 渲染方法
  const _fence: RenderRule | undefined = md.renderer.rules.fence?.bind(md.renderer.rules.fence);

  md.renderer.rules.fence = function (tokens: Token[], idx: number, options: Options, env: any, self: Renderer) {
    const token = tokens[idx];
    const info = token.info ? unescapeAll(token.info).trim() : '';
    let langName = '';
    let langAttrs = '';

    if (info) {
      const arr = info.split(/(\s+)/g);
      langName = arr[0];
      langAttrs = arr.slice(2).join('');
    }

    if ('mermaid' === langName) {
      const _id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      renderMermaid(_id, token.content);
      return `<div id="${_id}"><pre class="mermaid">${escapeHtml(token.content)}</pre></div>\n`;
    }

    let highlighted;
    if (options.highlight) {
      highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
    } else {
      highlighted = escapeHtml(token.content);
    }

    return _fence?.(tokens, idx, options, env, self) ?? `<pre><code${self.renderAttrs(token)}>${highlighted}</code></pre>\n`;
  };

  async function renderMermaid(id: string, text: string) {
    const defaultOptions: MermaidConfig = {
      theme: 'default',
      securityLevel: 'loose',
      startOnLoad: false
    };
    const mermaidOptions = Object.assign(defaultOptions, options);
    mermaid.initialize(mermaidOptions);
    const container = document.createElement('div');
    container.id = 'mermaid-container-' + id;
    container.style.position = 'absolute';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.zIndex = '-9999';
    document.body.appendChild(container);
    try {
      const { svg, bindFunctions } = await mermaid.render(`mermaid-container`, text, container);
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = svg;
        bindFunctions?.(element);
      }
    } catch (error) {
      console.error('Mermaid rendering error: ', error);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = `<div class="mermaid-error">Mermaid diagram rendering failed: ${error instanceof Error ? error.message : String(error)}</div>`;
        }
      }, 0);
    } finally {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  }

  return md;
}
```
