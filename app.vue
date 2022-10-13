<script setup>
useHead({
  title: useStore().title,
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' }
  ]
})
</script>

<template>
  <div id="app">
    <NuxtProgress />
    <NavBar />
    <NuxtPage class="content" />
    <Footer />
  </div>
</template>

<style>
@import './assets/main.css';
@import './assets/prose.css';
</style>
