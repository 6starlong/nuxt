<script setup>
const frame = ref(null)
const { y: scrollY } = useScroll(frame)
</script>

<template>
  <AppHeader />
  <div ref="frame" class="notion-frame">
    <AppHero :scroll-y="scrollY" />
    <slot />
    <AppFooter />
  </div>
</template>

<style>
.notion-frame {
  @apply relative h-[calc(100vh-45px)] w-100vw flex flex-col overflow-auto bg-base;
}

/* global style */
body {
  @apply text-base;
}

::-webkit-scrollbar {
  background: transparent;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  background: #474c50;
}

::-webkit-scrollbar-track {
  background: rgba(202, 204, 206, 0.04);
}

@keyframes animateElement {
  0% {
    transform: translate(0px, 50px);
  }

  100% {
    transform: translate(0px, 0px);
  }
}
</style>
