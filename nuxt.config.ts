export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus'],
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
      lang: 'zh-CN',
      author: 'Sᴛᴀʀʟᴏɴɢ',
      ogTitle: 'Sᴛᴀʀʟᴏɴɢ💫',
      ogSiteName: 'https://starlong.xyz'
    },
    manifest: {
      name: 'Sᴛᴀʀʟᴏɴɢ💫',
      short_name: 'Sᴛᴀʀʟᴏɴɢ',
      theme_color: '#0c0c0d',
      background_color: '#0c0c0d'
    }
  }
})
