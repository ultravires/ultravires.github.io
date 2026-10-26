<script lang="ts" setup>
import { computed } from 'vue';
import { useTopPages } from '../composables/useSiteStats';
import { data as posts } from '../posts.data.js';

const { data, loading, failed } = useTopPages(10);

// 将统计路径映射回站内文章，命中则以文章标题展示并生成站内链接
const titleByUrl = new Map(posts.map((post) => [post.url, post.title]));

const pages = computed(() =>
  (data.value?.pages ?? []).map((item) => {
    const title = titleByUrl.get(item.path);
    return {
      ...item,
      title: title ?? item.title ?? item.path,
      internal: title !== undefined
    };
  })
);
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold">
      热门文章
      <span
        class="ml-2 text-sm font-normal text-neutral-400 dark:text-neutral-500"
      >
        近 30 天
      </span>
    </h2>

    <div
      v-if="loading"
      class="mt-4 flex flex-col gap-3"
    >
      <div
        v-for="i in 5"
        :key="i"
        class="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-neutral-700/40"
      />
    </div>

    <p
      v-else-if="failed"
      class="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
    >
      统计数据暂时不可用，请稍后再来看
    </p>

    <ol
      v-else-if="pages.length"
      class="mt-2 divide-y divide-slate-100 dark:divide-neutral-700/60"
    >
      <li
        v-for="(item, index) in pages"
        :key="item.path"
      >
        <a
          v-if="item.internal"
          :href="item.path"
          class="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-neutral-700/40"
        >
          <span
            class="w-6 shrink-0 text-center text-sm font-semibold tabular-nums"
            :class="
              index < 3
                ? 'text-primary'
                : 'text-neutral-400 dark:text-neutral-500'
            "
          >
            {{ index + 1 }}
          </span>
          <span
            class="ellipsis group-hover:text-primary min-w-0 flex-1 font-medium"
          >
            {{ item.title }}
          </span>
          <span
            class="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500"
          >
            {{ item.pv.toLocaleString() }} 次阅读
          </span>
        </a>
        <div
          v-else
          class="-mx-2 flex items-center gap-3 px-2 py-3"
        >
          <span
            class="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-neutral-400 dark:text-neutral-500"
          >
            {{ index + 1 }}
          </span>
          <span class="ellipsis min-w-0 flex-1 font-medium">
            {{ item.title }}
          </span>
          <span
            class="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500"
          >
            {{ item.pv.toLocaleString() }} 次阅读
          </span>
        </div>
      </li>
    </ol>

    <p
      v-else
      class="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
    >
      暂无数据
    </p>
  </section>
</template>
