<script setup>
const { footer } = useAppConfig()
</script>

<template>
  <footer class="mt-auto border-t border-t-#2f2f2f">
    <div class="flex flex-y-center flex-between py-3 container">
      <span class="shrink-0 text-xs fw500 op90">{{ footer.text }}</span>

      <div class="flex flex-y-center gap-4">
        <a href="https://github.com/6starlong" target="_blank" title="GitHub" class="button-active">
          <Icon name="carbon-logo-github" />
        </a>
      </div>
    </div>
  </footer>
</template>
