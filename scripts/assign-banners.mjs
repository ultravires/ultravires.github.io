/**
 * 为所有文章 frontmatter 分配 banner 风格。
 * - 已有自定义 image URL 的文章保持 image 风格并保留图片地址；
 * - 其余文章按路径哈希在 particle / gradient / image 间均匀轮换；
 * - 统一补 wave: true。
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = join(import.meta.dirname, '../docs/src');
const EXCLUDE_DIRS = new Set(['moments', 'moment', 'link', 'about', 'archive', 'public']);
const STYLES = ['particle', 'gradient', 'image'];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!EXCLUDE_DIRS.has(name)) yield* walk(p);
    } else if (name.endsWith('.md') && name !== 'index.md') {
      yield p;
    }
  }
}

function processFile(file) {
  const rel = relative(SRC, file);
  const content = readFileSync(file, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return null;

  const lines = match[1].split('\n');
  const kept = [];
  let imageUrl = null;
  let blur = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^banner:/.test(line)) {
      // 跳过旧 banner 块，并提取其中的 image / blur 配置
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) {
        const sub = lines[++i];
        const img = sub.match(/^\s+image:\s*(\S+)\s*$/);
        if (img) imageUrl = img[1];
        if (/^\s+blur:\s*true/.test(sub)) blur = true;
      }
      continue;
    }
    kept.push(line);
  }

  // baidu 跳转图床地址已失效，直接丢弃改用随机图
  if (imageUrl && imageUrl.includes('image.baidu.com')) imageUrl = null;

  const style = imageUrl ? 'image' : STYLES[hashString(rel) % STYLES.length];

  const bannerLines = ['banner:', `  style: ${style}`];
  if (imageUrl) bannerLines.push(`  image: ${imageUrl}`);
  if (imageUrl && blur) bannerLines.push('  blur: true');
  bannerLines.push('  wave: true');

  const next = `---\n${[...kept, ...bannerLines].join('\n')}\n---\n${content.slice(match[0].length)}`;
  if (next !== content) {
    writeFileSync(file, next);
    return `${rel} -> ${style}${imageUrl ? ' (custom image)' : ''}`;
  }
  return null;
}

for (const file of walk(SRC)) {
  const result = processFile(file);
  if (result) console.log(result);
}
