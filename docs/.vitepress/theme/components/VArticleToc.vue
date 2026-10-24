<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { onContentUpdated, useData } from 'vitepress';
import VTooltip from './VTooltip.vue';
import { getHeaders } from '../composables/outline.js';
import { throttleAndDebounce } from '../support/utils.js';

const { frontmatter, theme } = useData();

interface TocItem {
  title: string;
  link: string;
  level: number;
  children?: TocItem[];
}

/** 各层级标题对应的横线长度：h1 最长，h6 最短 */
const LINE_WIDTH: Record<number, number> = {
  1: 40,
  2: 32,
  3: 26,
  4: 20,
  5: 15,
  6: 11
};

const headers = ref<TocItem[]>([]);
const expanded = ref(false);
const activeId = ref<string | null>(null);

/** 将嵌套的目录树拍平成文档顺序的列表 */
const flat = computed<TocItem[]>(() => flatten(headers.value));

function flatten(nodes: TocItem[], out: TocItem[] = []): TocItem[] {
  for (const node of nodes) {
    const { children, ...item } = node;
    out.push(item as TocItem);
    if (children?.length) flatten(children, out);
  }
  return out;
}

const minLevel = computed(() =>
  flat.value.length ? Math.min(...flat.value.map((item) => item.level)) : 1
);

const lineStyle = (level: number) => ({
  width: `${LINE_WIDTH[level] ?? 16}px`
});

const panelIndent = (level: number) =>
  `${8 + (level - minLevel.value) * 14}px`;

onContentUpdated(() => {
  // 尊重文章显式关闭目录的情况
  const outline = frontmatter.value.outline ?? theme.value.outline;
  headers.value = outline === false ? [] : (getHeaders([1, 6]) as unknown as TocItem[]);
  expanded.value = false;
  activeId.value = null;
  nextTick(setActiveLink);
});

/** 顶部固定导航高度 + 余量，用于粘性定位与高亮 */
const SCROLL_OFFSET = 72;

function getTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

function setActiveLink() {
  const scrollY = window.scrollY;
  let active: string | null = null;
  for (const item of flat.value) {
    const el = document.getElementById(item.link.slice(1));
    if (!el) continue;
    if (getTop(el) <= scrollY + SCROLL_OFFSET + 4) {
      active = item.link;
    } else {
      break;
    }
  }
  activeId.value = active;
}

const onScroll = throttleAndDebounce(setActiveLink, 100);

function scrollToHeading(link: string) {
  const id = decodeURIComponent(link.slice(1));
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: getTop(el) - SCROLL_OFFSET + 4, behavior: 'smooth' });
}

/** 折叠态点击横线：展开目录并定位到该标题 */
function onLineClick(item: TocItem) {
  expanded.value = true;
  scrollToHeading(item.link);
}

/** 展开态点击标题：定位到该标题（保持展开） */
function onTitleClick(item: TocItem) {
  scrollToHeading(item.link);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') expanded.value = false;
}

onMounted(() => {
  requestAnimationFrame(setActiveLink);
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <nav
    v-if="flat.length > 0"
    class="toc"
    :class="{ expanded }"
    aria-label="文章目录"
  >
    <!-- 折叠态：仅展示长短不一的横线 -->
    <div v-show="!expanded" class="rail">
      <ul>
        <li v-for="item in flat" :key="item.link">
          <VTooltip placement="right" :content="item.title">
            <button
              class="line"
              :class="{ active: item.link === activeId }"
              :style="lineStyle(item.level)"
              :aria-label="item.title"
              @click="onLineClick(item)"
            ></button>
          </VTooltip>
        </li>
      </ul>
    </div>

    <!-- 展开态：占据侧边栏空间的完整目录 -->
    <div v-show="expanded" class="sidebar">
      <header class="sidebar-header">
        <span>目录</span>
        <button class="sidebar-close" aria-label="收起目录" @click="expanded = false">×</button>
      </header>
      <ul class="sidebar-list">
        <li v-for="item in flat" :key="item.link">
          <a
            class="toc-item"
            :class="{ active: item.link === activeId }"
            :style="{ paddingLeft: panelIndent(item.level) }"
            :href="item.link"
            @click.prevent="onTitleClick(item)"
          >
            <span class="toc-line" :style="lineStyle(item.level)"></span>
            <span class="toc-text">{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.toc {
  position: sticky;
  top: 72px;
  flex: none;
  align-self: flex-start;
  width: 48px;
}

.toc.expanded {
  width: 240px;
}

/* 折叠态横线轨道 */
.rail ul {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.rail li {
  display: flex;
}

.line {
  display: block;
  height: 2px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 9999px;
  background: rgb(var(--web-color-base) / 0.28);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.line:hover {
  background: rgb(var(--web-color-base) / 0.6);
}

.line.active {
  background: var(--color-primary);
}

/* 展开态侧边栏 */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 8px 8px 16px;
  font-weight: 600;
}

.sidebar-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 6px;
  color: rgb(var(--web-color-base) / 0.5);
  background: transparent;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.sidebar-close:hover {
  color: rgb(var(--web-color-base));
  background: rgb(var(--web-color-base) / 0.08);
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0 8px 0 0;
  list-style: none;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 8px;
  color: rgb(var(--web-color-base) / 0.62);
  text-decoration: none;
  font-size: 13px;
  line-height: 1.5;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.toc-item:hover {
  color: rgb(var(--web-color-base));
  background: rgb(var(--web-color-base) / 0.05);
}

.toc-item.active {
  color: var(--color-primary);
  font-weight: 600;
}

.toc-line {
  flex: none;
  height: 2px;
  border-radius: 9999px;
  background: currentColor;
  opacity: 0.5;
}

.toc-item.active .toc-line {
  opacity: 1;
}

.toc-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 窄屏（< lg）隐藏侧边栏，正文占满 */
@media (max-width: 1023px) {
  .toc {
    display: none;
  }
}
</style>
