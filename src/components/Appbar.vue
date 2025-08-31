<template>
  <v-app-bar
    app
    flat
    color="white"
    elevation="2"
    class="custom-appbar"
  >
    <div class="d-flex align-center">
      <v-badge
        color="#C76B6B"
        content="v1.0 Beta"
        value="true"
        overlap
        offset-x="8"
        offset-y="18"
        class="version-badge"
      >
        <v-avatar>
          <v-img src="../assets/gerepIcon.png" />
        </v-avatar>
      </v-badge>
    </div>

    <v-spacer></v-spacer>

    <div class="d-flex align-center" v-if="isAuthenticated && isAuthInitialized">
      <v-chip
        class="mr-3 user-chip"
        small
        outlined
      >
        <v-icon left small>mdi-account</v-icon>
        {{ userName }}
      </v-chip>
      <UserMenu/>
    </div>
    
    <!-- Mostrar loading mientras se inicializa la autenticación -->
    <div class="d-flex align-center" v-else-if="!isAuthInitialized">
      <v-progress-circular
        indeterminate
        size="24"
        width="2"
        color="#C76B6B"
      ></v-progress-circular>
    </div>
  </v-app-bar>
</template>

<script>
import UserMenu from './UserMenu.vue';

export default {
  name: 'Appbar',
  components: {
    UserMenu
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    isAuthInitialized() {
      return this.$store.getters['auth/isAuthInitialized'];
    },
    userName() {
      const user = this.$store.getters['auth/currentUser'];
      if (user && user.email) {
        // Extraer el nombre del email (parte antes del @)
        return user.email.split('@')[0];
      }
      return 'Usuario';
    }
  }
}
</script>

<style scoped>
/* Appbar minimalista con acentos rosados */
.custom-appbar {
  border-bottom: 1px solid #f5f5f5 !important;
  background-color: white !important;
}

.appbar-title {
  font-weight: bold;
  color: #C76B6B !important;
}

/* Badge de versión en el logo */
.version-badge {
  position: relative;
}

.version-badge .v-badge__badge {
  font-size: 9px !important;
  font-weight: 600 !important;
  min-width: 26px !important;
  height: 18px !important;
  border-radius: 9px !important;
  color: white !important;
  letter-spacing: 0.2px;
  background-color: #C76B6B !important;
  border: 2px solid white !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Avatar con sombra sutil */
.v-avatar {
  box-shadow: 0 2px 4px rgba(199, 107, 107, 0.1);
}

/* Chip del usuario */
.user-chip {
  font-size: 12px;
  font-weight: 500;
  border-radius: 12px;
  color: #C76B6B !important;
  border-color: #F1A7A7 !important;
  background-color: rgba(241, 167, 167, 0.05) !important;
  text-transform: capitalize;
  transition: all 0.2s ease;
}

.user-chip:hover {
  background-color: rgba(241, 167, 167, 0.1) !important;
  border-color: #C76B6B !important;
}

.user-chip .v-icon {
  color: #C76B6B !important;
}
</style>
