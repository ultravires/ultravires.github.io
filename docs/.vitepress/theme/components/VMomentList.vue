<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { type MomentItem } from '../moments.data.js';

const props = defineProps<{
  moments: MomentItem[];
}>();

const pageSize = 10;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.moments.length / pageSize));
const paginatedMoments = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return props.moments.slice(start, end);
});

const changePage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const pageNumbers = computed(() => {
  const pages: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages.value - 3; i <= totalPages.value; i++)
        pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage.value - 1);
      pages.push(currentPage.value);
      pages.push(currentPage.value + 1);
      pages.push('...');
      pages.push(totalPages.value);
    }
  }
  return pages;
});
</script>

<template>
  <div class="flex w-full flex-col items-center">
    <p
      v-if="!moments.length"
      class="my-8 text-neutral-400 dark:text-neutral-500"
    >
      还没有时刻，去
      <code>docs/src/moments/moments.ts</code>
      写下第一条吧。
    </p>

    <!-- 时间线 -->
    <ul class="w-full">
      <li
        v-for="moment in paginatedMoments"
        :key="moment.date.time"
        class="relative border-l-2 border-solid border-slate-200 pb-10 pl-8 last:border-transparent dark:border-neutral-700"
      >
        <!-- 时间线圆点 -->
        <span
          class="bg-primary absolute -left-[5px] top-1.5 h-2 w-2 rounded-full ring-4 ring-white dark:ring-neutral-800"
        />

        <time
          class="inline-flex items-center gap-1.5 text-sm text-neutral-400 dark:text-neutral-500"
          :datetime="moment.date.string"
        >
          <Icon
            icon="mdi:clock-outline"
            class="text-base"
          />
          {{ moment.date.string }}
          <span class="text-xs">（{{ moment.date.fromNow }}）</span>
        </time>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          class="VPDoc prose dark:prose-invert mt-2 max-w-none"
          v-html="moment.html"
        />

        <div
          v-if="moment.tags.length"
          class="mt-3 flex flex-wrap gap-2"
        >
          <span
            v-for="tag in moment.tags"
            :key="tag"
            class="bg-primary/10 text-primary rounded-full px-3 py-0.5 text-xs"
          >
            {{ tag }}
          </span>
        </div>
      </li>
    </ul>

    <!-- Pagination Controls -->
    <div
      v-if="totalPages > 1"
      class="mb-8 mt-8 flex items-center justify-center gap-2"
    >
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="border-primary text-primary hover:bg-primary group inline-flex cursor-pointer items-center gap-2 rounded-full border border-solid px-4 py-2 transition-all duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-black"
      >
        <Icon icon="mdi:arrow-left" />
        <span>上一页</span>
      </button>

      <div class="mx-2 flex items-center gap-1">
        <template
          v-for="(page, index) in pageNumbers"
          :key="index"
        >
          <button
            v-if="page !== '...'"
            @click="changePage(page)"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-300"
            :class="
              currentPage === page
                ? 'bg-primary text-white dark:text-black'
                : 'hover:bg-primary/20 text-primary'
            "
          >
            {{ page }}
          </button>
          <span
            v-else
            class="text-primary flex h-8 w-8 items-center justify-center"
          >
            ...
          </span>
        </template>
      </div>

      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="border-primary text-primary hover:bg-primary group inline-flex cursor-pointer items-center gap-2 rounded-full border border-solid px-4 py-2 transition-all duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-black"
      >
        <span>下一页</span>
        <Icon icon="mdi:arrow-right" />
      </button>
    </div>
  </div>
</template>
