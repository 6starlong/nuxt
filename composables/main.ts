import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const title = ref('Sᴛᴀʀʟᴏɴɢ💫')
  const avatar = ref('/avatar.png')
  const github = ref('https://github.com/6starlong')

  return {
    title,
    avatar,
    github
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
