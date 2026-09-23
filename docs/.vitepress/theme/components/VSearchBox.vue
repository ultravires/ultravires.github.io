<script lang="ts" setup>
import { useRoute, useRouter } from 'vitepress';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue';
import VIconDice from '../assets/svg/dice.svg?component';
import VIconSearch from '../assets/svg/search.svg?component';
import { useSearch } from '../composables/useSearch';
import { data as posts, type Post } from '../posts.data';

const MAX_RESULTS = 20;
const RECOMMEND_COUNT = 5;

interface SearchRecord {
  post: Post;
  title: string;
  summary: string;
}

interface SearchResult extends SearchRecord {
  score: number;
}

const { isOpen, close } = useSearch();
const router = useRouter();
const route = useRoute();

const query = ref('');
const activeIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const recommendedItems = ref<SearchResult[]>([]);

let records: SearchRecord[] | null = null;

function htmlToText(html: string): string {
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim();
}

/** 构建检索记录：仅标题 + 摘要（excerpt 为渲染后的 HTML，需转纯文本） */
function getRecords(): SearchRecord[] {
  if (import.meta.env.SSR) return [];
  records ??= posts.map((post) => ({
    post,
    title: post.title ?? '',
    summary: htmlToText(post.excerpt ?? '')
  }));
  return records;
}

const terms = computed(() =>
  query.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
);

const results = computed<SearchResult[]>(() => {
  if (terms.value.length === 0) return [];

  const matched: SearchResult[] = [];
  for (const record of getRecords()) {
    const title = record.title.toLowerCase();
    const summary = record.summary.toLowerCase();

    let score = 0;
    const hit = terms.value.every((term) => {
      const inTitle = title.includes(term);
      const inSummary = summary.includes(term);
      score += inTitle ? 10 : inSummary ? 1 : 0;
      return inTitle || inSummary;
    });

    if (hit) matched.push({ ...record, score });
  }

  matched.sort(
    (a, b) => b.score - a.score || b.post.date.time - a.post.date.time
  );
  return matched.slice(0, MAX_RESULTS);
});

/** 当前展示列表：有搜索结果时为结果列表，否则为随机推荐 */
const displayItems = computed<SearchResult[]>(() =>
  results.value.length > 0 ? results.value : recommendedItems.value
);

/** 洗牌抽取指定数量的随机推荐文章（仅客户端触发，无 SSR 影响） */
function refreshRecommendations() {
  const shuffled = [...getRecords()];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  recommendedItems.value = shuffled
    .slice(0, RECOMMEND_COUNT)
    .map((record) => ({ ...record, score: 0 }));
  activeIndex.value = 0;
}

/** 换一批后把焦点还给输入框，便于继续输入 */
function onRefreshRecommendations() {
  refreshRecommendations();
  inputRef.value?.focus();
}

watch(results, () => {
  activeIndex.value = 0;
});

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    refreshRecommendations();
    nextTick(() => inputRef.value?.focus());
  }
});

function escapeRegExp(str: string): string {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

function escapeHtml(str: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, (c) => entities[c]);
}

/** 转义纯文本后用 <mark> 包裹命中词，供 v-html 安全渲染 */
function highlight(text: string): string {
  const escaped = escapeHtml(text);
  const raw = query.value.trim().split(/\s+/).filter(Boolean);
  if (raw.length === 0) return escaped;

  const pattern = raw
    .sort((a, b) => b.length - a.length)
    .map((term) => escapeRegExp(escapeHtml(term)))
    .join('|');
  return escaped.replace(new RegExp(`(${pattern})`, 'gi'), '<mark>$1</mark>');
}

/** 摘要过长时截取首个命中位置附近的片段 */
function snippetOf(record: SearchRecord): string {
  const text = record.summary;
  if (!text) return '';

  const lower = text.toLowerCase();
  const firstHit = terms.value.reduce((idx, term) => {
    const i = lower.indexOf(term);
    return i !== -1 && (idx === -1 || i < idx) ? i : idx;
  }, -1);

  if (firstHit === -1) return text.slice(0, 120);

  const start = Math.max(0, firstHit - 40);
  const end = Math.min(text.length, firstHit + 90);
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
}

function move(delta: number) {
  const count = displayItems.value.length;
  if (count === 0) return;

  activeIndex.value = (activeIndex.value + delta + count) % count;
  nextTick(() => {
    listRef.value?.children[activeIndex.value]?.scrollIntoView({
      block: 'nearest'
    });
  });
}

function navigate(result: SearchResult) {
  const keyword = query.value.trim();
  if (keyword) {
    // 供 useSearchHighlight 在跳转后的文章正文里高亮搜索词
    sessionStorage.setItem('vitepress:local-search-filter', keyword);
  }

  const url = result.post.url;
  close();

  if (route.path.replace(/\/$/, '') === url.replace(/\/$/, '')) {
    // 就在当前文章页：路由不会变化，手动通知重新高亮
    nextTick(() => window.dispatchEvent(new CustomEvent('search:highlight')));
  } else {
    router.go(url);
  }
}

function isEditingContent(event: KeyboardEvent): boolean {
  const element = event.target as HTMLElement;
  const tagName = element.tagName;

  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  );
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) {
    if (
      (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) ||
      (!isEditingContent(event) && event.key === '/')
    ) {
      event.preventDefault();
      isOpen.value = true;
    }
    return;
  }

  if (event.key === 'Escape') {
    close();
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    move(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    move(-1);
  } else if (event.key === 'Enter') {
    const target = displayItems.value[activeIndex.value];
    if (target) navigate(target);
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition name="search-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-label="搜索文章"
      >
        <!-- 遮罩 -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="close"
        />

        <!-- 面板 -->
        <div
          class="border-line relative mx-auto mt-[12vh] flex max-h-[70vh] w-[min(640px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-solid bg-(--web-content-bg) shadow-2xl"
        >
          <!-- 输入框 -->
          <div
            class="border-line flex items-center gap-3 border-b border-solid px-4"
          >
            <VIconSearch class="shrink-0 text-lg opacity-60" />
            <input
              ref="inputRef"
              v-model="query"
              class="h-13 w-full bg-transparent text-base outline-none placeholder:text-neutral-400"
              type="text"
              placeholder="搜索文章标题或摘要…"
              role="combobox"
              aria-expanded="true"
              aria-controls="search-result-list"
            />
            <kbd
              class="border-line shrink-0 rounded border border-solid px-1.5 py-0.5 text-xs text-neutral-400"
            >
              ESC
            </kbd>
          </div>

          <!-- 结果列表 -->
          <ul
            v-if="results.length > 0"
            id="search-result-list"
            ref="listRef"
            class="flex-1 overflow-y-auto p-2"
            role="listbox"
          >
            <li
              v-for="(result, index) in results"
              :key="result.post.url"
              class="cursor-pointer rounded-lg px-3 py-2"
              :class="{ 'bg-primary/10': index === activeIndex }"
              role="option"
              :aria-selected="index === activeIndex"
              @mouseenter="activeIndex = index"
              @click="navigate(result)"
            >
              <div
                class="mb-0.5 flex items-center justify-between text-xs text-neutral-400"
              >
                <span>{{ result.post.categories.join(' / ') }}</span>
                <span>{{ result.post.date.string }}</span>
              </div>
              <div
                class="ellipsis text-base font-medium"
                v-html="highlight(result.title)"
              />
              <div
                v-if="result.summary"
                class="mt-0.5 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400"
                v-html="highlight(snippetOf(result))"
              />
            </li>
          </ul>

          <!-- 随机推荐（未输入关键词时） -->
          <div v-else-if="!query.trim()" class="flex-1 overflow-y-auto p-2">
            <div
              class="mb-1 flex items-center justify-between px-3 py-1 text-xs text-neutral-400"
            >
              <span>随机推荐</span>
              <button
                class="hover:bg-primary/10 hover:text-primary flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 transition-colors"
                type="button"
                @click="onRefreshRecommendations"
              >
                <VIconDice class="text-sm" />
                换一批
              </button>
            </div>
            <ul id="search-result-list" ref="listRef" role="listbox">
              <li
                v-for="(item, index) in recommendedItems"
                :key="item.post.url"
                class="cursor-pointer rounded-lg px-3 py-2"
                :class="{ 'bg-primary/10': index === activeIndex }"
                role="option"
                :aria-selected="index === activeIndex"
                @mouseenter="activeIndex = index"
                @click="navigate(item)"
              >
                <div
                  class="mb-0.5 flex items-center justify-between text-xs text-neutral-400"
                >
                  <span>{{ item.post.categories.join(' / ') }}</span>
                  <span>{{ item.post.date.string }}</span>
                </div>
                <div
                  class="ellipsis text-base font-medium"
                  v-html="highlight(item.title)"
                />
                <div
                  v-if="item.summary"
                  class="mt-0.5 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400"
                  v-html="highlight(snippetOf(item))"
                />
              </li>
            </ul>
          </div>

          <!-- 空状态 -->
          <div v-else class="px-4 py-10 text-center text-sm text-neutral-400">
            没有找到与“{{ query.trim() }}”相关的文章
          </div>

          <!-- 底部快捷键提示 -->
          <div
            class="border-line flex items-center gap-4 border-t border-solid px-4 py-2 text-xs text-neutral-400"
          >
            <span><kbd>↑</kbd><kbd>↓</kbd> 切换</span>
            <span><kbd>↵</kbd> 打开</span>
            <span><kbd>ESC</kbd> 关闭</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-modal-enter-active,
.search-modal-leave-active {
  transition: opacity 0.2s ease;
}

.search-modal-enter-from,
.search-modal-leave-to {
  opacity: 0;
}

:deep(mark) {
  padding: 0 1px;
  border-radius: 2px;
  color: inherit;
  background-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
}

kbd {
  display: inline-block;
  min-width: 1.25rem;
  text-align: center;
}
</style>
