<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed, onBeforeUnmount, ref } from 'vue';
import VIconDice from '../assets/svg/dice.svg?component';
import VIconSearch from '../assets/svg/search.svg?component';
import { friendLinks, type FriendLink } from '../../../src/link/links';

interface LinkRecord extends FriendLink {
  /** 去掉 www. 的域名，如 cn.vuejs.org */
  domain: string;
  /** 名称首字符，用于生成徽标 */
  initial: string;
  /** 由名称哈希出的色相（0-359），徽标配色用 */
  hue: number;
  /** 供检索的小写文本（名称 + 简介 + 域名 + 标签） */
  haystack: string;
}

const { frontmatter } = useData();

function hashHue(text: string): number {
  let hash = 0;
  for (const ch of text) {
    hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) >>> 0;
  }
  // 黄金角散列，让名称相近的条目色相也尽量错开
  return Math.floor((hash * 137.508) % 360);
}

const records: LinkRecord[] = friendLinks.map((link) => {
  const domain = new URL(link.url).host.replace(/^www\./, '');
  return {
    ...link,
    domain,
    initial: [...link.name][0].toUpperCase(),
    hue: hashHue(link.name),
    haystack: [link.name, link.description, domain, ...(link.tags ?? [])]
      .join(' ')
      .toLowerCase()
  };
});

/* ---------- 搜索 ---------- */

const query = ref('');

const terms = computed(() =>
  query.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
);

const filtered = computed<LinkRecord[]>(() => {
  if (terms.value.length === 0) return records;
  return records.filter((record) =>
    terms.value.every((term) => record.haystack.includes(term))
  );
});

function escapeHtml(text: string): string {
  return text.replace(
    /[&<>"']/g,
    (ch) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[ch] ?? ch
  );
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 转义原文后把命中词包上 <mark>（复用主题 search-highlight 样式） */
function highlight(text: string): string {
  const escaped = escapeHtml(text);
  if (terms.value.length === 0) return escaped;
  const pattern = terms.value.map(escapeRegExp).join('|');
  return escaped.replace(
    new RegExp(`(${pattern})`, 'gi'),
    '<mark class="search-highlight">$1</mark>'
  );
}

function clearQuery() {
  query.value = '';
}

/* ---------- 随机串门 ---------- */

const drawing = ref(false);
const drawn = ref<LinkRecord | null>(null);
const shuffleName = ref('');

let lastIndex = -1;
let timer: ReturnType<typeof setTimeout> | undefined;

function pickIndex(): number {
  if (records.length === 1) return 0;
  let index = lastIndex;
  while (index === lastIndex) {
    index = Math.floor(Math.random() * records.length);
  }
  lastIndex = index;
  return index;
}

function draw() {
  if (drawing.value || records.length === 0) return;
  drawn.value = null;

  const target = pickIndex();
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (reduceMotion) {
    drawn.value = records[target];
    return;
  }

  drawing.value = true;
  let tick = 0;
  const totalTicks = 9;
  const step = () => {
    shuffleName.value =
      records[Math.floor(Math.random() * records.length)].name;
    tick += 1;
    if (tick >= totalTicks) {
      drawing.value = false;
      drawn.value = records[target];
      return;
    }
    // 间隔逐渐拉长，模拟老虎机减速
    timer = setTimeout(step, 50 + tick * 22);
  };
  step();
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <section class="container mx-auto min-h-dvh">
    <main class="@container/main">
      <div
        class="mx-auto rounded-xl border border-slate-200 bg-white px-8 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <!-- 刊头：标题 + 标语 + 计数 -->
        <header class="mt-4">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <h1 class="text-3xl font-bold max-md:text-2xl">
              {{ frontmatter.title }}
              <span
                v-if="frontmatter.title"
                class="text-primary"
              >
                。
              </span>
            </h1>
            <span
              class="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500"
              aria-live="polite"
            >
              <template v-if="terms.length">
                找到 {{ filtered.length }} / {{ records.length }} 个
              </template>
              <template v-else>共 {{ records.length }} 个</template>
            </span>
          </div>
          <p
            v-if="frontmatter.description"
            class="mt-2 max-w-[60ch] text-lg text-neutral-500 dark:text-neutral-400"
          >
            {{ frontmatter.description }}
          </p>
        </header>

        <!-- 行动行：搜索 + 随机串门 -->
        <div class="mt-6 flex gap-3 max-sm:flex-col">
          <label class="relative flex-1">
            <span class="sr-only">搜索友链</span>
            <VIconSearch
              class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            />
            <input
              v-model="query"
              type="search"
              placeholder="搜索名称、简介或域名"
              class="border-line focus-visible:border-primary w-full rounded-full border bg-transparent py-2.5 pl-11 pr-4 text-sm transition-colors placeholder:text-neutral-400 focus-visible:outline-none dark:bg-neutral-900/60"
            />
          </label>
          <button
            type="button"
            :disabled="drawing || records.length === 0"
            class="bg-primary focus-visible:ring-primary inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 dark:text-black dark:ring-offset-neutral-800"
            @click="draw"
          >
            <VIconDice :class="['h-4 w-4', { rotating: drawing }]" />
            随机串门
          </button>
        </div>

        <!-- 抽签结果槽 -->
        <div
          v-if="drawing || drawn"
          aria-live="polite"
          class="border-primary/50 bg-primary/5 dark:bg-primary/10 mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-dashed px-4 py-3"
        >
          <template v-if="drawing">
            <span
              class="shrink-0 text-sm text-neutral-500 dark:text-neutral-400"
            >
              正在串门到
            </span>
            <span class="text-primary ellipsis min-w-0 flex-1 font-medium">
              {{ shuffleName }}
            </span>
          </template>
          <template v-else-if="drawn">
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--hue)_72%_93%)] text-base font-semibold text-[hsl(var(--hue)_55%_38%)] dark:bg-[hsl(var(--hue)_45%_26%)] dark:text-[hsl(var(--hue)_78%_74%)]"
              :style="{ '--hue': drawn.hue }"
            >
              <img
                v-if="drawn.avatar"
                :src="drawn.avatar"
                :alt="drawn.name"
                loading="lazy"
                class="h-full w-full rounded-lg object-cover"
              />
              <template v-else>{{ drawn.initial }}</template>
            </span>
            <span class="min-w-0 flex-1">
              <span class="ellipsis block font-medium">{{ drawn.name }}</span>
              <span
                class="ellipsis block text-xs text-neutral-400 dark:text-neutral-500"
              >
                {{ drawn.domain }}
              </span>
            </span>
            <span
              class="flex shrink-0 items-center gap-2 max-sm:basis-full max-sm:justify-end"
            >
              <a
                :href="drawn.url"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-primary focus-visible:ring-primary rounded-full px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:text-black dark:ring-offset-neutral-800"
              >
                前往站点
              </a>
              <button
                type="button"
                class="text-primary hover:bg-primary/10 focus-visible:ring-primary cursor-pointer rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
                @click="draw"
              >
                再抽一个
              </button>
            </span>
          </template>
        </div>

        <!-- 友链登记簿 -->
        <ul
          v-if="filtered.length"
          class="mt-6 divide-y divide-slate-100 dark:divide-neutral-700/60"
        >
          <li
            v-for="record in filtered"
            :key="record.url"
          >
            <a
              :href="record.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group -mx-2 flex items-center gap-4 rounded-lg px-2 py-4 transition-colors hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none dark:hover:bg-neutral-700/40 dark:focus-visible:bg-neutral-700/40"
            >
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--hue)_72%_93%)] text-base font-semibold text-[hsl(var(--hue)_55%_38%)] dark:bg-[hsl(var(--hue)_45%_26%)] dark:text-[hsl(var(--hue)_78%_74%)]"
                :style="{ '--hue': record.hue }"
              >
                <img
                  v-if="record.avatar"
                  :src="record.avatar"
                  :alt="record.name"
                  loading="lazy"
                  class="h-full w-full rounded-lg object-cover"
                />
                <template v-else>{{ record.initial }}</template>
              </span>
              <span class="min-w-0 flex-1">
                <span
                  class="group-hover:text-primary block font-medium transition-colors"
                  v-html="highlight(record.name)"
                ></span>
                <span
                  class="ellipsis mt-0.5 block text-sm text-neutral-500 dark:text-neutral-400"
                  v-html="highlight(record.description)"
                ></span>
              </span>
              <span
                class="shrink-0 text-xs text-neutral-400 max-sm:hidden dark:text-neutral-500"
              >
                {{ record.domain }}
              </span>
            </a>
          </li>
        </ul>

        <!-- 搜索无结果 -->
        <div
          v-else
          class="mt-6 rounded-xl border border-dashed border-slate-200 px-4 py-12 text-center dark:border-neutral-700"
        >
          <p class="text-sm text-neutral-500 dark:text-neutral-400">
            没有找到与“{{ query.trim() }}”匹配的友链
          </p>
          <button
            type="button"
            class="border-line text-primary hover:bg-primary/5 focus-visible:ring-primary mt-3 cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2"
            @click="clearQuery"
          >
            清空搜索
          </button>
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped>
.rotating {
  animation: dice-rotate 0.7s linear infinite;
}

@keyframes dice-rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rotating {
    animation: none;
  }
}
</style>
