import { createRouter, createWebHistory } from 'vue-router';
import ProductDetailView from '../views/ProductDetailView.vue';

const routes = [
  { path: '/products/:id', component: ProductDetailView, props: true, name: 'ProductDetailView' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
console.log(router.getRoutes());
export default router;