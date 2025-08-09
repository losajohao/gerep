<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card
          class="pa-6"
          elevation="8"
          style="border-radius: 16px;"
        >
          <v-card-title class="justify-center" style="font-size: 24px; font-weight: bold;">
            Bienvenido
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              outlined
              hide-details
              class="custom-input mb-4"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              outlined
              hide-details
              class="custom-input mb-4"
            ></v-text-field>

            <v-btn
              :loading="loading"
              color="black"
              dark
              block
              large
              rounded
              @click="handleLogin"
            >
              Sign In
            </v-btn>

            <v-alert v-if="error" type="error" dense class="mt-3">
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { useAuth } from '../composables/useAuth';
import { useAuthFlow } from '../composables/useAuthFlow';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  
  computed: {
    // Obtener propiedades reactivas de los composables
    loading() {
      const { loading } = useAuth();
      return loading.value;
    },
    
    error() {
      const { error } = useAuth();
      return error.value;
    }
  },
  
  async mounted() {
    // Inicializar autenticación
    const { initializeAuth } = useAuth();
    const { setupAuthRedirect } = useAuthFlow();
    
    await initializeAuth();
    setupAuthRedirect();
    
    // Configurar watcher para redirecciones automáticas
    this.$watch(
      () => this.$store.getters['auth/currentUser'],
      (user) => {
        if (user && this.$route.path === '/login') {
          this.$router.push('/home').catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              console.error('Error en navegación:', err);
            }
          });
        }
      },
      { immediate: true }
    );
  },
  
  methods: {
    async handleLogin() {
      const { login, clearError } = useAuth();
      const { handleLoginSuccess } = useAuthFlow();
      
      clearError();
      
      const success = await login(this.email, this.password);
      
      if (success) {
        handleLoginSuccess(this);
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}

.custom-input .v-input__control {
  border-radius: 12px;
}

.v-btn {
  font-weight: bold;
  font-size: 16px;
}
</style>
