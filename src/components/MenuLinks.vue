<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect, logout } = useAuth0()

import { repoStore } from '@/stores/repositories'
import { myUserStore } from '@/stores/user'
import { computed } from 'vue'

const store = repoStore()
const userStore = myUserStore()
function login() {
  return loginWithRedirect({
    appState: {
      target: '/discovery'
    }
  })
}

function logOut() {
  return logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  }).then(() => store.$reset())
}

const getUser = computed(() => {
  return userStore.getUser
})

</script>
<template>
  <nav class="flex justify-end">
    <button v-if="!getUser" class="mr-6" @click="login">Log in</button>
    <button v-if="getUser" class="mr-6">{{ getUser.nickname }}</button>
    <button v-if="getUser" @click="logOut">Log Out</button>
  </nav>
</template>
