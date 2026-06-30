import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterationView from '@/views/RegisterationView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PlannerView from '@/views/PlannerView.vue'
import TrackerView from '@/views/TrackerView.vue'
import FoodView from '@/views/FoodView.vue'
import FavoriteFoodView from '@/views/FavoriteFoodView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias:'/home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/planner',
      name: 'planner',
      component: PlannerView,
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: TrackerView,
    },
    {
      path: '/food/:foodId',
      name: 'food',
      component: FoodView,
    },
    {
      path: '/favfood/',
      name: 'favFood',
      component: FavoriteFoodView,
    },

  ],
})

export default router
