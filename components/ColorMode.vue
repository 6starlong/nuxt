<script setup lang="ts">
const color = useColorMode()

function toggleDark () {
  color.preference = color.value === 'dark'
    ? 'sepia'
    : color.value === 'sepia' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <div class=" sepia:i-carbon:cafe dark:i-carbon-moon i-carbon-sun" />
  </button>
</template>
