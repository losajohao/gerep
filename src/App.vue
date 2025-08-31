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
    // Inicializar el listener de autenticación globalmente
    const { initializeAuth } = useAuth();
    await initializeAuth();
  }
};
</script>
