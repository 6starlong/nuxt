<script setup>
useHead({
  title: 'Nuxt App',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' }
  ]
})

const name = 'Nuxt'
const { data } = await useFetch(`/api/hello?name=${name}`)
</script>

<template>
  <div>
    <NuxtWelcome />
    <div class="fixed top-0 left-0">
      {{ data }}
    </div>
  </div>
</template>

<style>
@import './assets/main.css';
</style>
