import { createRouter, createWebHistory } from 'vue-router';
import ProductDetailView from '../views/ProductDetailView.vue';
import HomepageView from '../views/HomepageView.vue';
import CartView from '../views/CartView.vue';
import LoginpageView from '../views/LoginpageView.vue';
import AccountcreateView from '../views/AccountcreateView.vue';

const routes = [
  { path: '/products/:id', component: ProductDetailView, props: true, name: 'ProductDetailView' },
  { path: '/home', component: HomepageView, props: true, name: 'HomepageView' },
  { path: '/cart', component: CartView, props: true, name: 'CartView' },
  { path: '/login', component: LoginpageView, props: true, name: 'LoginpageView' },
  { path: '/createaccount', component: AccountcreateView, props: true, name: 'AccountcreateView' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
console.log(router.getRoutes());
export default router;