// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
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
  unocss: {
    // https://uno.antfu.me/
    preflight: true
  },
  colorMode: {
    // https://color-mode.nuxtjs.org/
    classSuffix: ''
  },
  content: {
    // https://content.nuxtjs.org/api/configuration
    highlight: {}
  }
})
