import type { RouterOptions } from '@nuxt/schema'

// https://v3.nuxtjs.org/guide/directory-structure/pages/#router-options
// https://router.vuejs.org/api/interfaces/routeroptions.html#scrollbehavior
export default <RouterOptions>{
  scrollBehavior: (_to: any, _from: any, savedPosition: any) => {
    return { top: savedPosition?.top || 0, behavior: 'smooth' }
  }
}
