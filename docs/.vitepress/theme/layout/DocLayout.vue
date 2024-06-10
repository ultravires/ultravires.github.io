<script lang="ts" setup>
import VDocMeta from '../components/VDocMeta.vue'
import VDocFooter from '../components/VDocFooter.vue';
import VOutline from '../components/VOutline.vue';
import VAvatar from '../components/VAvatar.vue';
import VIconGithub from '../components/icons/VIconGithub.vue';
</script>

<template>
  <div class="@container">
    <div class="@8xl:max-w-[87.5rem] md:px-6 max-md:container mx-auto">
      <div class="max-lg:flex-col flex gap-2 justify-center w-full">
        <aside class="order-2 flex-grow-1 flex-shrink-0 relative pl-4 w-80">
          <div class="flex flex-col gap-4 justify-center items-center p-4 mb-2 w-full bg-gradient-to-t from-blue-700 to-blue-600 rounded-md">
            <div class="px-2 py-1 bg-white bg-opacity-20 text-white text-sm rounded-xl">完成比完美更重要</div>
            <!-- <VAvatar class="bg-blue-800" /> -->
            <div class="w-full text-white">
              <p>我也不知道怎么介绍自己！前端天花板，男，长得还可以。喜欢捣鼓技术，什么都略知一二。</p>
            </div>
            <div class="flex gap-4 items-center w-full">
              <div>
                <div class="text-white text-lg font-medium">向成渝</div>
                <div class="text-white text-sm text-opacity-70">专注于计算机科学与技术</div>
              </div>
              <div>
                <a class="hover:bg-opacity-90 hover:scale-110 hover:text-blue-800 inline-flex justify-center items-center p-2 bg-white bg-opacity-20 text-white text-2xl rounded-full transition-all origin-center" href="https://github.com/ultravires" target="_blank">
                  <VIconGithub />
                </a>
              </div>
            </div>
          </div>
          <div class="sticky flex flex-col top-[calc(var(--web-header-height)+1rem)]">
            <VOutline />
          </div>
        </aside>
        <div class="
          dark:bg-neutral-900
          dark:border-neutral-700
          dark:max-sm:bg-transparent
          max-md:px-6
          max-sm:px-6
          max-sm:border-0
          max-sm:bg-transparent
          order-1
          p-12
          w-full
          mx-auto
          bg-white
          rounded-md
          border
          border-solid
          border-neutral-200
          overflow-auto
        ">
          <article
            ref="docRef"
            id="article"
            class="
              VPDoc
              lg:prose-xl
              dark:prose-invert
              dark:prose-pre:border-neutral-700
              prose-pre:border
              prose-pre:border-solid
              prose-pre:border-neutral-200
              prose-code:px-2
              prose-code:py-1
              prose-code:bg-primary
              prose-code:bg-opacity-10
              prose-code:text-primary
              prose-code:rounded-md
              prose-blockquote:not-italic
              prose-blockquote:font-normal
              prose-table:block
              prose-table:overflow-x-auto
              prose-th:border
              prose-th:border-solid
              prose-td:border
              prose-td:border-solid
              max-w-none
              prose
              prose-lg
              prose-neutral
            "
          >
            <Content />
          </article>
          <VDocFooter />
          <VDocMeta />
        </div>
      </div>
    </div>
  </div>
</template>
