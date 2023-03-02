import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { AuthenticationGuard } from 'vue-auth0-plugin'
// const CallbackPage = () => import("@/pages/callback-page.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: () => import('../views/DiscoveryView.vue'),
      // beforeEnter: [AuthenticationGuard]
    }
  ]
})

export default router
