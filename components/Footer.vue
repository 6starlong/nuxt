<script setup lang="ts">
const { title, github } = useStore()
</script>

<template>
  <footer class="footer">
    <div class="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="flex flex-col items-center h-full gap-4 py-4 sm:flex-row sm:justify-between sm:gap-x-16">
        <p class="font-500 text-xs op-90">
          2022-PRESENT © Powered by {{ title }}
        </p>
        <div class="flex items-center gap-3 text-3.25">
          <a :href="github" target="_blank" i-carbon:logo-github class="op-70 hover:op-90 transition-opacity-250" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  --at-apply: border-t border-#f5f5f5 dark:border-#181818 cafe:border-#e5d5c5;
}
</style>
