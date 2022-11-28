<script setup>
useHead({
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
