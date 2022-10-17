<script setup>
useHead({
  title: useStore().title,
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' }
  ],
  meta: [
    { name: 'referrer', content: 'same-origin' }
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
