<template>
  <v-app-bar
    app
    flat
    color="white"
    elevation="2"
    class="custom-appbar"
  >
    <div class="d-flex align-center">
      <v-avatar>
        <v-img src="../assets/gerepIcon.png" />
      </v-avatar>
    </div>

    <v-spacer></v-spacer>

    <v-chip
      class="mr-2 custom-chip"
      outlined
    >
      By Luz Karina Lopez Saavedra (alias kakaroto)
    </v-chip>

    <UserMenu/>
  </v-app-bar>
</template>

<script>
import UserMenu from './UserMenu.vue';

export default {
  name: 'Appbar',
  components: {
    UserMenu
  },
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

/* Chip con paleta rosada minimalista */
.custom-chip {
  font-size: 12px;
  border-radius: 12px;
  color: #C76B6B !important;
  border-color: #F1A7A7 !important;
  background-color: rgba(241, 167, 167, 0.1) !important;
}

.custom-chip:hover {
  background-color: rgba(241, 167, 167, 0.2) !important;
  border-color: #C76B6B !important;
}

/* Avatar con sombra sutil */
.v-avatar {
  box-shadow: 0 2px 4px rgba(199, 107, 107, 0.1);
}
</style>
