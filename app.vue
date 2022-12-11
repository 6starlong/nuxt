<script setup>
const docus = useDocus()

useHead({
  meta: [{ name: 'author', content: docus.value.author }],
  htmlAttrs: [{ lang: 'zh-CN' }]
})
</script>

<template>
  <AppLayout>
    <NuxtPage class="content" />
  </AppLayout>
</template>

<style>
@import './assets/css/main.css';
@import './assets/css/prose.css';
</style>
