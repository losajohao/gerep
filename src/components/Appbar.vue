<template>
  <v-app-bar
    app
    flat
    color="white"
    elevation="2"
    class="custom-appbar"
  >
    <div class="d-flex align-center">
      <v-icon class="mr-2" color="black">mdi-chart-bar</v-icon>
      <v-toolbar-title class="appbar-title">GEREP</v-toolbar-title>
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
.custom-appbar {
  border-bottom: 1px solid #e0e0e0;
}

.appbar-title {
  font-weight: bold;
  color: #333;
}

.custom-chip {
  font-size: 12px;
  border-radius: 12px;
  color: #1976d2; /* Azul */
  border-color: #1976d2;
}
</style>
