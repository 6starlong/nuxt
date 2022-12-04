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
    // https://github.com/nuxt/framework/issues/8352
    inlineSSRStyles: false
  },
  unocss: {
    preflight: true
  },
  colorMode: {
    preference: 'dark'
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'one-dark-pro'
    },
    watch: {
      ws: {
      // https://github.com/nuxt/content/issues/1631
        hostname: 'localhost'
      }
    }
  },
  nitro: {
    plugins: ['~/server/plugins/content.ts']
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
