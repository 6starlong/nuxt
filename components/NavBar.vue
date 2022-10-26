<script setup lang="ts">
const { title, avatar, github } = useStore()
const route = useRoute()

let isTop = $ref(true)
onMounted(() => {
  const { y } = useScroll(document, {
    onScroll () {
      isTop = y.value === 0
    }
  })
})
</script>

<template>
  <header class="header" :class="{ 'header--overlay': route.path === '/', 'header--top': isTop }">
    <NuxtLink to="/" class="flex shrink-0 hover:op-60 transition-opacity-250">
      <img :src="avatar" class="w-6 h-6 rounded-1/2">
      <span class="pl-2 fw600" :title="title">{{ title }}</span>
    </NuxtLink>

    <nav class="grid grid-flow-col items-center gap-5">
      <NuxtLink to="/" flex="~ y-center">
        <div i-ri:home-6-line />
        <span class="ml-1 fw500">Home</span>
      </NuxtLink>

      <NuxtLink to="/posts" flex="~ y-center">
        <div i-ri:article-line />
        <span class="ml-1 fw500">Blog</span>
      </NuxtLink>

      <ColorMode />

      <NuxtLink :to="github" target="_blank" title="GitHub">
        <div i-uil-github-alt />
      </NuxtLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  --at-apply: fixed top-0 inset-x-0 z-10 container-fluid h-nav color-base bg-overlay;
  --at-apply: flex-(~ between y-center) backdrop-(saturate-180 blur-20);
}

.header.header--overlay.header--top {
  --at-apply: c-white bg-transparent backdrop-filter-none;
}

nav a,
nav button {
  --at-apply: op-60 hover:op-100 transition-opacity-250;
}
</style>
