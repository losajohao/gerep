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
          <v-icon color="#1976d2">mdi-account-circle</v-icon>
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
          <v-icon color="red">mdi-logout</v-icon>
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
.user-btn {
  padding: 0;
}

.user-menu-list {
  min-width: 150px;
}

.logout-title {
  color: red;
  font-weight: 500;
}
</style>
