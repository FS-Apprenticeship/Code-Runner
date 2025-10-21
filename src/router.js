import { createRouter, createWebHistory } from 'vue-router'

import { pinia } from './main'
import { useUserStore } from './stores/user'
import { useChallengeStore } from './stores/challenge'

import LandingPage from '@/views/LandingPage.vue'
import SigninPage from './views/SigninPage.vue'
import SignupPage from './views/SignupPage.vue'
import SelectionPage from './views/SelectionPage.vue'
import ChallengePage from './views/ChallengePage.vue'
import { syncStoreUsers } from './services/auth'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/signin', component: SigninPage },
  { path: '/signup', component: SignupPage },
  { path: '/selection', component: SelectionPage, meta: { requiresAuth: true } },
  { path: '/challenge', component: ChallengePage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// initialize the user stores in router so theyre already loaded
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore(pinia)
  const challengeStore = useChallengeStore(pinia)
  await userStore.loadUser()
  syncStoreUsers(userStore, challengeStore);
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/signin')
  } else {
    if (userStore.isLoggedIn) {
      console.log("filler")
    }
    next()
  }
})

export default router