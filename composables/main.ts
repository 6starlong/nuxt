import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStore = defineStore('main', () => {

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
