<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useOverview } from '../composables/useSiteStats';

const { data, loading, failed } = useOverview();

const cards = computed(() => {
  if (!data.value) return [];
  const { today, yesterday, total, online } = data.value;
  return [
    { label: '今日 PV', value: today.pv, icon: 'mdi:eye-outline' },
    { label: '今日访客', value: today.uv, icon: 'mdi:account-outline' },
    { label: '昨日 PV', value: yesterday.pv, icon: 'mdi:calendar-arrow-left' },
    { label: '昨日访客', value: yesterday.uv, icon: 'mdi:calendar-outline' },
    { label: '累计 PV', value: total.pv, icon: 'mdi:chart-line' },
    { label: '累计访客', value: total.uv, icon: 'mdi:account-group-outline' },
    { label: '当前在线', value: online, icon: 'mdi:access-point' }
  ];
});
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold">访问概览</h2>

    <!-- 加载骨架 -->
    <div
      v-if="loading"
      class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="i in 7"
        :key="i"
        class="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-neutral-700/40"
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
      class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="card in cards"
        :key="card.label"
        class="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-neutral-700 dark:bg-neutral-700/30"
      >
        <div
          class="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400"
        >
          <Icon
            :icon="card.icon"
            class="text-base"
          />
          {{ card.label }}
        </div>
        <div class="mt-1 text-2xl font-bold tabular-nums">
          {{ card.value.toLocaleString() }}
        </div>
      </div>
    </div>

    <p
      v-if="!loading && !failed && data?.updatedAt"
      class="mt-3 text-right text-xs text-neutral-400 dark:text-neutral-500"
    >
      数据更新于 {{ new Date(data.updatedAt).toLocaleString('zh-CN') }}（快照每
      2 天更新一次）
    </p>
  </section>
</template>
