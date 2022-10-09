// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // https://modules.nuxtjs.org/
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content'
  ],
  experimental: {
    reactivityTransform: true
  },
  // https://uno.antfu.me/
  unocss: {
    preflight: true
  },
  // https://color-mode.nuxtjs.org/
  colorMode: {
    classSuffix: ''
  },
  // https://content.nuxtjs.org/api/configuration
  content: {
    documentDriven: true,
    highlight: {}
  }
})
