/** 由相对路径（如 ai/xxx.md）推导 cleanUrls 下的站点路径 */
export function toUrlPath(relativePath: string): string {
  const stripped = relativePath.replace(/\.md$/, '');
  if (stripped === 'index') return '/';
  if (stripped.endsWith('/index')) {
    return `/${stripped.slice(0, -'index'.length)}`;
  }
  return `/${stripped}`;
}
