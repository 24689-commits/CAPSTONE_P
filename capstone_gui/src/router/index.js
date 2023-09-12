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
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/Books',
    name: 'Books',
    component: () => import('../views/BooksView.vue')
  },
  {
    path: '/checkout',
  name: 'checkout',
  component: () => import('../views/CheckoutView.vue'),
  props: true, 
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue')
  },
  {
    path: '/FAQs',
    name: 'FAQs',
    component: () => import('../views/FaqView.vue')
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: () => import('../views/UserProfile.vue'),
    meta: {
      requiresAuth: true, // Requires authentication to access the profile page
    },
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router