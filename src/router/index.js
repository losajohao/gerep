import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { auth } from '../utils/firebase';
import LoginView from '@/views/LoginView.vue';

Vue.use(VueRouter);

const routes = [
   {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next('/login');
  } else if (to.path === '/login' && user) {
    // Redirige solo si no estamos ya en /home
    if (from.path !== '/home') {
      next('/home');
    } else {
      next(false); // cancela navegación redundante
    }
  } else {
    next();
  }
});


export default router;
