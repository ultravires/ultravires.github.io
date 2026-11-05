import type { MarkdownRenderer } from 'vitepress';

/**
 * markdown-it 渲染规则扩展。
 *
 * - mermaid 代码块：输出 `<Mermaid>` 组件标签，由主题侧异步加载 mermaid 渲染。
 *   不在构建期引入 mermaid，避免其各类图表 chunk 进入 app 入口的依赖图，
 *   否则 VitePress 会把入口的动态依赖一并 modulepreload，导致全站每页
 *   都要预载约 1MB 的图表代码。
 * - 表格：统一包裹一层可横向滚动的容器，避免小屏下表格溢出页面。
 */
export function markdownConfig(md: MarkdownRenderer): void {
  const renderToken: NonNullable<(typeof md.renderer.rules)[string]> = (
    tokens,
    idx,
    options,
    _env,
    self
  ) => self.renderToken(tokens, idx, options);

  const tableOpen = md.renderer.rules.table_open ?? renderToken;
  const tableClose = md.renderer.rules.table_close ?? renderToken;
  md.renderer.rules.table_open = (...args) =>
    `<div class="table-wrapper">${tableOpen(...args)}`;
  md.renderer.rules.table_close = (...args) => `${tableClose(...args)}</div>`;

  const fence = md.renderer.rules.fence ?? renderToken;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0];

    if (lang === 'mermaid' || lang === 'mmd') {
      // graph 内容经 encodeURIComponent 编码，可安全放入双引号属性中
      return `<Mermaid class="mermaid" graph="${encodeURIComponent(token.content)}" />`;
    }

    return fence(tokens, idx, options, env, self);
  };
}
