<script lang="ts" setup>
import VPostList from '@theme/components/VPostList.vue';
import VProfileCard from '@theme/components/VProfileCard.vue';
</script>

<template>
  <div class="@container">
    <div class="@8xl:max-w-[87.5rem] max-md:container md:px-6 mx-auto">
      <div class="flex gap-6">
        <VPostList />
        <aside class="shrink-0 flex flex-col gap-2 w-72 max-lg:hidden">
          <VProfileCard />
        </aside>
      </div>
    </div>
  </div>
</template>
