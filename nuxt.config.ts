export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxt/content',
    '@kevinmarrec/nuxt-pwa'
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false
  },
  colorMode: {
    preference: 'dark'
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'one-dark-pro'
    }
  },
  pwa: {
    icon: {
      fileName: 'favicon.png'
    },
    meta: {
      title: 'Sᴛᴀʀʟoɴɢ💫',
      author: 'Starlong',
      description: 'Starlong\'s Blog',
      lang: 'zh-CN'
    },
    manifest: {
      name: 'Sᴛᴀʀʟoɴɢ💫',
      short_name: 'Sᴛᴀʀʟoɴɢ',
      theme_color: '#0c0c0d',
      background_color: '#0c0c0d'
    }
  }
})
