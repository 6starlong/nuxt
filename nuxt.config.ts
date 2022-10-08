// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode'
  ],
  unocss: {
    preflight: true
  },
  colorMode: {
    classSuffix: ''
  }
})
