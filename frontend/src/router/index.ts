import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      name: 'products',
      alias: '/',
      component: () => import('../views/Product/ListView.vue')
    },
    {
      path: '/products/add',
      name: 'addProduct',
      component: () => import('../views/Product/FormView.vue'),
    },
    {
      path: '/products/:id/edit',
      name: 'editProduct',
      component: () => import('../views/Product/FormView.vue'),
    },
    {
      path: '/products/:id',
      name: 'showProduct',
      component: () => import('../views/Product/ShowView.vue'),
    },
    // default route
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ],
})

export default router
