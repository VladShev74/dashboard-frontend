import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/class-schedule',
      name: 'class-schedule',
      component: () => import('../views/ClassScheduleView.vue'),
    },
    {
      path: '/member-plans',
      name: 'member-plans',
      component: () => import('../views/MemberPlansView.vue'),
    },
  ],
})

export default router
