// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // https://modules.nuxtjs.org/
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@kevinmarrec/nuxt-pwa'
  ],
  experimental: {
    reactivityTransform: true,
    // https://github.com/nuxt/framework/issues/8352
    inlineSSRStyles: false
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
    workbox: {
      enabled: true
    },
    icon: {
      fileName: 'avatar.png'
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
      theme_color: '#121518',
      background_color: '#121518'
    }
  }
})
