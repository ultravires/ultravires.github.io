<script lang="ts" setup>
import { computed } from 'vue';
import { useVisitorProfile } from '../composables/useSiteStats';

const { data, loading, failed } = useVisitorProfile();

const groups = computed(() => [
  { title: '访客地域', items: data.value?.regions ?? [] },
  { title: '访问设备', items: data.value?.devices ?? [] },
  { title: '来源网站', items: data.value?.referrers ?? [] }
]);

function toPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold">访客画像</h2>

    <div
      v-if="loading"
      class="mt-4 grid gap-3 md:grid-cols-3"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="h-40 animate-pulse rounded-xl bg-slate-100 dark:bg-neutral-700/40"
      />
    </div>

    <p
      v-else-if="failed"
      class="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
    >
      统计数据暂时不可用，请稍后再来看
    </p>

    <div
      v-else
      class="mt-4 grid gap-3 md:grid-cols-3"
    >
      <div
        v-for="group in groups"
        :key="group.title"
        class="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-neutral-700 dark:bg-neutral-700/30"
      >
        <h3 class="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {{ group.title }}
        </h3>
        <ul
          v-if="group.items.length"
          class="mt-3 flex flex-col gap-2.5"
        >
          <li
            v-for="item in group.items"
            :key="item.name"
          >
            <div class="flex items-baseline justify-between gap-2 text-sm">
              <span class="ellipsis">{{ item.name }}</span>
              <span
                class="shrink-0 tabular-nums text-neutral-400 dark:text-neutral-500"
              >
                {{ toPercent(item.ratio) }}
              </span>
            </div>
            <div
              class="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200/70 dark:bg-neutral-600/50"
            >
              <div
                class="bg-primary h-full rounded-full"
                :style="{ width: toPercent(item.ratio) }"
              />
            </div>
          </li>
        </ul>
        <p
          v-else
          class="mt-3 text-sm text-neutral-400 dark:text-neutral-500"
        >
          暂无数据
        </p>
      </div>
    </div>
  </section>
</template>
