import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegistroVisitasView from '@/views/RegistroVisitasView.vue';
import IndicadoresView from '@/views/IndicadoresView.vue';
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
  },
  {
    path: '/anexos/registros',
    name: 'RegistroVisitas',
    component: RegistroVisitasView,
    meta: { requiresAuth: true }
  },
  {
    path: '/anexos/indicadores',
    name: 'Indicadores',
    component: IndicadoresView,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isInitialized = store.getters['auth/isAuthInitialized'];
  
  // Si Firebase Auth no se ha inicializado, esperar
  if (!isInitialized) {
    try {
      await store.dispatch('auth/initializeAuthListener');
    } catch (error) {
      console.error('Error inicializando auth:', error);
    }
  }
  
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
