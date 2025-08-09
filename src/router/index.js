import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import store from '../store';

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
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const isInitialized = store.getters['auth/isAuthInitialized'];

  // Si no está inicializado, permitir la navegación
  // El composable useAuthFlow manejará la redirección apropiada
  if (!isInitialized) {
    next();
    return;
  }

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    // Evitar navegación redundante a login si ya está autenticado
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
