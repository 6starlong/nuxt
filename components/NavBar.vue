<script setup lang="ts">
const { title, avatar, github } = useStore()
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="flex shrink-0 hover:op-60 transition-opacity-250">
      <img :src="avatar" class="w-6 h-6 rounded-1/2">
      <span class="pl-2 font-600" :title="title">{{ title }}</span>
    </NuxtLink>

    <nav class="grid grid-flow-col items-center gap-5">
      <NuxtLink to="/posts" class="flex items-center ">
        <div i-ri:article-line />
        <span class="ml-1 font-500">Blog</span>
      </NuxtLink>

      <ColorMode />

      <a :href="github" target="_blank" title="GitHub">
        <div i-uil-github-alt />
      </a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  --at-apply: fixed top-0 inset-x-0 z-10 flex justify-between items-center px-4 sm:px-6 lg:px-8;
  --at-apply: text-lg h-var(--nav-height) backdrop-(saturate-180 blur-20);
  --at-apply: bg-#fff/80 dark:bg-#121518/80 cafe:bg-#eadec2/80;
}

nav a,
nav button {
  --at-apply: op-60 hover:op-100 transition-opacity-250;
}
</style>
