export default defineNuxtConfig({
  // extends: ['@nuxt-themes/typography'],
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon'
    // 'pinceau/nuxt'
    // 'vue3-notion/nuxt'
  ],
  experimental: {
    reactivityTransform: true,
    inlineSSRStyles: false
    // payloadExtraction: false
  },
  css: ['@unocss/reset/tailwind.css'],
  ssr: false,
  nitro: {
    devProxy: {
      '/v3': {
        target: 'https://www.notion.so/api/v3',
        // target: 'https://starlong.notion.site/api/v3',
        changeOrigin: true
        // 'Notion-Version': '2022-06-28',
        // Authorization: `Bearer ${process.env.NOTION_API_KEY}`
      }
    }
  }
  // colorMode: {
  //   preference: 'dark'
  // }
})
