<template>
  <v-container fluid fill-height class="login-container">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <div class="text-center">
          
          <v-card
          class="pa-6 login-card"
          elevation="8"
          style="border-radius: 16px;"
          >
          <v-badge
            color="#C76B6B"
            content="v1.0 Beta"
            value="true"
            overlap
            offset-x="15"
            offset-y="25"
            class="version-badge"
          >
            <v-avatar class="mb-4" style="width: 100px; height: 100px;" >
              <v-img src="../assets/gerepIcon.png" />
            </v-avatar>
          </v-badge>
          <v-card-title class="justify-center login-title" style="font-size: 24px; font-weight: bold;">
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
              class="login-btn"
              dark
              block
              large
              rounded
              @click="handleLogin"
            >
              Ingresar
            </v-btn>

            <v-alert v-if="error" type="error" dense class="mt-3">
              {{ error }}
            </v-alert>
          </v-card-text>
          </v-card>
        </div>
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
/* Contenedor principal minimalista con fondo blanco */
.login-container {
  background-color: white !important;
  min-height: 100vh;
}

/* Tarjeta de login blanca con sombra sutil */
.login-card {
  background-color: white !important;
  border-radius: 16px;
  border: 1px solid #f5f5f5;
}

/* Título con acento rosado sutil */
.login-title {
  color: #C76B6B !important;
}

/* Inputs minimalistas */
.custom-input .v-input__control {
  border-radius: 12px;
}

.custom-input >>> .v-input__slot {
  background-color: white !important;
}

.custom-input >>> .v-label {
  color: #666 !important;
}

.custom-input >>> .v-input__slot fieldset {
  border-color: #e0e0e0 !important;
}

.custom-input >>> .v-input--is-focused .v-input__slot fieldset {
  border-color: #F1A7A7 !important;
  border-width: 2px !important;
}

.custom-input >>> .v-input--is-focused .v-label {
  color: #C76B6B !important;
}

/* Botón minimalista con acento rosado */
.login-btn {
  background-color: #C76B6B !important;
  font-weight: bold;
  font-size: 16px;
  border: none !important;
}

.login-btn:hover {
  background-color: #F1A7A7 !important;
  color: #C76B6B !important;
}

/* Alert de error */
.v-alert.error {
  background-color: #ffebee !important;
  color: #c62828 !important;
  border-left: 4px solid #c62828 !important;
}

/* Badge de versión en el logo del login */
.version-badge {
  position: relative;
}

.version-badge .v-badge__badge {
  font-size: 10px !important;
  font-weight: 600 !important;
  min-width: 28px !important;
  height: 20px !important;
  border-radius: 10px !important;
  color: white !important;
  letter-spacing: 0.2px;
  background-color: #C76B6B !important;
  border: 2px solid white !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
