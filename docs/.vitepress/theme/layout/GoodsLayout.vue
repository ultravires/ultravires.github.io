<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed, ref } from 'vue';
import { goods } from '../../../src/goods/goods';

const { frontmatter } = useData();

const ALL = '全部';

/** 按数据中出现顺序去重分类 */
const categories = [ALL, ...new Set(goods.map((good) => good.category))];

const activeCategory = ref(ALL);

const filtered = computed(() =>
  activeCategory.value === ALL
    ? goods
    : goods.filter((good) => good.category === activeCategory.value)
);
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
              <template v-if="activeCategory !== ALL">
                {{ filtered.length }} / {{ goods.length }} 件
              </template>
              <template v-else>共 {{ goods.length }} 件</template>
            </span>
          </div>
          <p
            v-if="frontmatter.description"
            class="mt-2 max-w-[60ch] text-neutral-500 dark:text-neutral-400"
          >
            {{ frontmatter.description }}
          </p>
        </header>

        <!-- 分类筛选 -->
        <div class="mt-6 flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :class="[
              'focus-visible:ring-primary cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2',
              category === activeCategory
                ? 'border-primary bg-primary text-white dark:text-black'
                : 'border-line hover:border-primary hover:text-primary text-neutral-500 dark:text-neutral-400'
            ]"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <!-- 好物卡片 -->
        <ul class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="good in filtered"
            :key="good.name"
            class="group flex flex-col overflow-hidden rounded-xl border border-slate-200 transition-shadow hover:shadow-lg dark:border-neutral-700 dark:hover:shadow-black/40"
          >
            <div class="aspect-[16/9] bg-slate-50 p-6 dark:bg-neutral-700/40">
              <img
                :src="good.image"
                :srcset="
                  good.image2x
                    ? `${good.image} 1x, ${good.image2x} 2x`
                    : undefined
                "
                :alt="good.name"
                loading="lazy"
                class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div class="flex flex-1 flex-col p-4">
              <div class="flex items-center justify-between gap-2">
                <h2 class="font-semibold">{{ good.name }}</h2>
                <span
                  class="bg-primary/10 text-primary shrink-0 rounded-full px-2.5 py-0.5 text-xs"
                >
                  {{ good.category }}
                </span>
              </div>
              <p class="mt-0.5 text-sm text-neutral-400 dark:text-neutral-500">
                {{ good.info }}
              </p>
              <p
                class="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400"
              >
                {{ good.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </section>
</template>
