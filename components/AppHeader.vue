<script setup>
const { title, avatar } = useAppConfig()
const { page, getBlockTitle, getBlockIcon } = useNotion()

const route = useRoute()
const home = computed(() => route.path === '/')
</script>

<template>
  <header class="z-100 max-w-100vw select-none bg-base">
    <div class="relative h-45px max-w-100vw w-100% px-3 transition duration-700 ease-out" flex="~ y-center between">
      <div class="mr-2 h-100% min-w-30 flex flex-y-center">
        <NuxtLink to="/" class="min-w-0 shrink-1 button-active">
          <img class="mr-1.5 h-5" :src="avatar" alt="avatar">
          <span class="truncate text-sm fw500">{{ title }}</span>
        </NuxtLink>

        <template v-if="!home && page">
          <span class="mx-0.5 min-w-0 text-[rgba(255,255,255,.282)]">/</span>

          <div class="min-w-0 shrink-1 button-active">
            <span class="mr-1.5">{{ getBlockIcon(page) }}</span>
            <span class="max-w-80 truncate text-sm fw500">{{ getBlockTitle(page) }}</span>
          </div>
        </template>
      </div>

      <div class="shrink-1 grow-1" />

      <nav class="grid grid-flow-col gap-4">
        <div class="w-70px button-active">
          <Icon name="carbon-search" class="mr-1.5" />
          <span>搜索</span>
        </div>

        <a href="https://github.com/6starlong" target="_blank" title="GitHub" class="button-active">
          <Icon name="carbon-logo-github" />
        </a>

        <a href="https://twitter.com/6starlong" target="_blank" title="Twitter" class="button-active">
          <Icon name="carbon-logo-twitter" />
        </a>

        <button class="button-active">
          <Icon name="carbon-moon" />
        </button>
      </nav>
    </div>
  </header>
</template>
