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
    path: '/Checkout',
    name: 'Checkout',
    component: () => import('../views/CheckoutView.vue')
  },
  {
    path: '/checkout/:bookId', // Add the parameter here
    name: 'checkout',
    component: () => import('../views/CheckoutView.vue'),
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
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router