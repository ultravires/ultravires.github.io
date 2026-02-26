<script lang="ts" setup>
import { computed, ref } from 'vue';
import VPost from '../components/VPost.vue';
import VPostCard from '../components/VPostCard.vue';
import { type Post } from '../posts.data.js';

const props = defineProps<{
  posts: Post[];
}>();

const type = ref('list'); // 'card' | 'list'
const pageSize = 12;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.posts.length / pageSize));
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return props.posts.slice(start, end);
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
    <ul class="flex w-full flex-wrap">
      <li
        v-for="post in paginatedPosts"
        :key="post.title"
        :class="[
          {
            'mb-4 mr-4 w-[calc(calc(100%-1rem)/2)] even:mr-0 max-md:mr-0 max-md:w-full':
              type === 'card'
          },
          { 'mb-8 w-full': type === 'list' }
        ]"
      >
        <VPost
          v-if="type === 'list'"
          :post="post"
        />
        <VPostCard
          v-else-if="type === 'card'"
          :post="post"
        />
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
        class="border-primary text-primary hover:bg-primary cursor-pointer rounded-full border border-solid px-4 py-2 transition-all duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-black"
      >
        Prev
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
        class="border-primary text-primary hover:bg-primary cursor-pointer rounded-full border border-solid px-4 py-2 transition-all duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-black"
      >
        Next
      </button>
    </div>
  </div>
</template>
