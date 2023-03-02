import { defineStore } from 'pinia'

export const myUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  getters: {
    getUser(state) {
      return state.user
    }
  },
  persist: true
})
