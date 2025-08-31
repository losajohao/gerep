<template>
  <v-app>
    <appbar/>
    <v-main>
      <router-view/>
    </v-main>
    <app-footer/>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar.vue';
import AppFooter from './components/AppFooter.vue';
import { useAuth } from './composables/useAuth';

export default {
  name: 'App',
  components: {
    Appbar,
    AppFooter
  },
  data: () => ({
    //
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  async mounted() {
    try {
      // Inicializar el listener de autenticación globalmente
      const { initializeAuth } = useAuth();
      
      // Timeout de seguridad para evitar loading infinito
      const initPromise = initializeAuth();
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          console.warn('Timeout en inicialización de auth, continuando...');
          this.$store.commit('auth/SET_INITIALIZED', true);
          resolve();
        }, 5000); // 5 segundos de timeout
      });
      
      await Promise.race([initPromise, timeoutPromise]);
      console.log('Auth listener inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar auth listener:', error);
      // Asegurar que se marque como inicializado incluso si hay error
      this.$store.commit('auth/SET_INITIALIZED', true);
    }
  }
};
</script>
