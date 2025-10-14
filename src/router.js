import { createRouter, createWebHistory } from 'vue-router'

import { pinia } from './main'
import { useUserStore } from './stores/user'
import { useChallengeStore } from './stores/challenge'

import LandingPage from '@/views/LandingPage.vue'

const routes = [
  { path: '/', component: LandingPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// initialize the user stores in router so theyre already loaded
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(pinia)
  const challengeStore = useChallengeStore(pinia)
  next()
})

export default router
