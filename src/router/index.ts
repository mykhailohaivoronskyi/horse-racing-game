import { createWebHistory, createRouter } from 'vue-router'

import RaceView from '../views/RaceView.vue'

const routes = [
  { path: '/', component: RaceView },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
