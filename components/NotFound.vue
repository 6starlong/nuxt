<script setup lang="ts">
const props = defineProps({
  appName: {
    type: String,
    default: ''
  },
  statusCode: {
    type: Number,
    default: 404
  },
  statusMessage: {
    type: String,
    default: '页面没有找到'
  },
  backHome: {
    type: String,
    default: '返回首页'
  }
})
useHead({
  title: `${props.statusCode} - ${props.statusMessage}`
})
</script>

<template>
  <div class="font-sans h-50vh grid place-content-center overflow-hidden">
    <div class="fixed left-0 right-0 z-10 spotlight" />
    <div class="max-w-520px text-center z-20">
      <h1 class="text-7xl sm:text-9xl font-medium mb-8" v-text="statusCode" />
      <p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" v-text="statusMessage" />
      <div class="w-full flex flex-center">
        <NuxtLink to="/" class="gradient-border sm:text-xl py-2 sm:py-3 px-4 sm:px-6">
          {{ backHome }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spotlight {
  background: linear-gradient(45deg, #00DC82 0%, #36E4DA 50%, #0047E1 100%);
  filter: blur(20vh);
  height: 40vh;
  bottom: -30vh;
}

.gradient-border {
  position: relative;
  border-radius: 0.5rem;
  backdrop-filter: blur(10px);
}

.gradient-border::before {
  background: linear-gradient(90deg, #303030 0%, #303030 25%, #00DC82 50%, #36E4DA 75%, #0047E1 100%);
}

.gradient-border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
  padding: 2px;
  width: 100%;
  background-size: 400% auto;
  opacity: 0.5;
  transition: background-position 0.3s ease-in-out, opacity 0.2s ease-in-out;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.gradient-border:hover::before {
  background-position: -50% 0;
  opacity: 1
}

.font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"
}
</style>
