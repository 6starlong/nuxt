<script setup>
useHead({
  title: 'Nuxt App',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' }
  ]
})
</script>

<template>
  <div>
    <NavBar />
    <NuxtPage class="content" />
    <Footer />
  </div>
</template>

<style>
@import './assets/main.css';
</style>
