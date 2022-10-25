<script setup lang="ts">
const { title, github } = useStore()
</script>

<template>
  <footer class="footer">
    <div class="container-lg">
      <div class="h-full py-4 gap-4 sm:gap-x-16" flex="~ y-center col sm:row sm:between">
        <p class="fw500 text-xs op-90">
          2022-PRESENT © Powered by {{ title }}
        </p>
        <div class="gap-3 text-sm" flex="~ y-center">
          <a :href="github" target="_blank" i-carbon:logo-github class="op-70 hover:op-90 transition-opacity-250" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  --at-apply: border-t border-base;
}
</style>
