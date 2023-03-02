<script setup>
import FiltersListing from '@/components/FiltersListing.vue'
const { user } = useAuth0()
import { onMounted } from 'vue'
import { myUserStore } from '@/stores/user'
import { useAuth0 } from '@auth0/auth0-vue'
const userStore = myUserStore()
onMounted(() => {
  userStore.user = user
})
</script>

<template>
  <main>
    <FiltersListing v-if="userStore.user" />
  </main>
</template>
