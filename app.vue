<script setup>
useHead({
  title: 'Nuxt App',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' }
  ]
})
</script>

<template>
  <main class="py-20 px-10 text-center">
    <NavBar />
    <NuxtPage />
    <Footer />
  </main>
</template>

<style>
@import './assets/main.css';
</style>
