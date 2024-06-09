<script lang="ts" setup>
defineProps<{
  headers?: []
  root?: boolean
}>()

function onClick({ target: el }: Event) {
  const id = (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.getElementById(decodeURIComponent(id))
  heading?.focus({ preventScroll: true })
}
</script>

<template>
  <ul class="group/outline" :class="{ relative: root }">
    <li v-for="{ children, link, title } in headers" :key="link">
      <a
        :href="link"
        class="group/link hover:text-green-600 [&.active]:text-lg [&.active]:text-green-600 [&.active]:font-medium block text-base text-opacity-60 h-[32px] leading-[32px] whitespace-nowrap text-ellipsis overflow-hidden transition-all"
        :title="title"
        @click="onClick"
      >
        <span class="group-hover/outline:blur-none group-[.active]/link:blur-none blur-[0.035rem]">{{ title }}</span>
      </a>
      <template v-if="children?.length">
        <VOutlineItem class="ml-4" :headers="children" :root="false" />
      </template>
    </li>
  </ul>
</template>