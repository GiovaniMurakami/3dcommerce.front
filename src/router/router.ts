import { createRouter, createWebHistory } from 'vue-router';
import ProductDetailView from '../views/ProductDetailView.vue';
import HomepageView from '../views/HomepageView.vue';
import CartView from '../views/CartView.vue';

const routes = [
  { path: '/products/:id', component: ProductDetailView, props: true, name: 'ProductDetailView' },
  { path: '/home', component: HomepageView, props: true, name: 'HomepageView' },
  { path: '/cart', component: CartView, props: true, name: 'CartView' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
console.log(router.getRoutes());
export default router;