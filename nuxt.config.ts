// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode'
  ],
  experimental: {
    reactivityTransform: true
  },
  unocss: {
    preflight: true
  },
  colorMode: {
    classSuffix: ''
  }
})
