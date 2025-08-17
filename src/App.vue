<template>
  <v-app>
    <appbar v-if="isAuthenticated"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar.vue';
import { useAuth } from './composables/useAuth';

export default {
  name: 'App',
  components: {
    Appbar
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
