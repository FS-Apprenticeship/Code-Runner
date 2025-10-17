import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/views/LandingPage.vue'
import SigninPage from './views/SigninPage.vue'
import SignupPage from './views/SignupPage.vue'
import SelectionPage from './views/SelectionPage.vue'
import ChallengePage from './views/ChallengePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/signin', component: SigninPage },
    { path: '/signup', component: SignupPage },
    { path: '/selection', component: SelectionPage},
    { path: '/challenge', component: ChallengePage},
  ],
})

export default router
