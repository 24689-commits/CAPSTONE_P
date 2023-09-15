import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about11',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/Books11',
    name: 'Books',
    component: () => import('../views/BooksView.vue')
  },
  {
    path: '/checkout11',
  name: 'checkout',
  component: () => import('../views/CheckoutView.vue'),
  },
  {
    path: '/Contact11',
    name: 'Contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/FAQs11',
    name: 'FAQs',
    component: () => import('../views/FaqView.vue')
  },
  {
    path: '/Admin11',
    name: 'Admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/profile11',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/LogoutView.vue'),
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router