<script setup lang="ts">
const color = useColorMode()

function toggleDark () {
  color.preference = color.value === 'dark'
    ? 'cafe'
    : color.value === 'cafe' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class=" cafe:i-carbon:cafe dark:i-carbon-moon i-carbon-sun" />
  </button>
</template>
