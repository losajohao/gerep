<template>
  <v-menu
    bottom
    left
    offset-y
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        class="user-btn"
      >
        <v-avatar size="32">
          <v-icon color="#C76B6B">mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list dense class="user-menu-list">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="handleItem(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="handleLogout">
        <v-list-item-title class="logout-title">Cerrar sesión</v-list-item-title>
        <v-list-item-icon>
          <v-icon color="#C76B6B">mdi-logout</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      items: [
        { title: "Perfil" },
        { title: "Configuración" }
      ],
    };
  },
  methods: {
    async handleLogout() {
      await signOut(auth);
      this.$router.push("/login").catch(() => {});
    },
    handleItem(item) {
      // Aquí podrías agregar navegación o acciones según el item
      console.log("Seleccionado:", item.title);
    }
  },
};
</script>

<style scoped>
/* Botón de usuario minimalista */
.user-btn {
  padding: 0;
}

.user-btn:hover {
  background-color: rgba(241, 167, 167, 0.1) !important;
}

/* Lista del menú con estilo minimalista */
.user-menu-list {
  min-width: 150px;
  background-color: white !important;
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(199, 107, 107, 0.1) !important;
}

/* Items del menú */
.user-menu-list .v-list-item {
  color: #666 !important;
  transition: all 0.2s ease;
}

.user-menu-list .v-list-item:hover {
  background-color: rgba(241, 167, 167, 0.1) !important;
  color: #C76B6B !important;
}

/* Título de cerrar sesión con paleta rosada */
.logout-title {
  color: #C76B6B !important;
  font-weight: 500;
}

.user-menu-list .v-list-item:hover .logout-title {
  color: #C76B6B !important;
  font-weight: 600;
}

/* Avatar del usuario */
.v-avatar {
  transition: all 0.2s ease;
}

.user-btn:hover .v-avatar {
  transform: scale(1.05);
}
</style>
