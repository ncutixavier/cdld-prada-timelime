import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoubleComponentView from '@/views/DoubleComponentView.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/double-component",
    name: "double-component",
    component: DoubleComponentView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
