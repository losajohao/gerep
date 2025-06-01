<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      style="background-color: red;"
    >
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-chart-bar</v-icon>
        <v-toolbar-title>GEREP</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-chip color="white" text-color="blue" class="mr-2" >By Luz Karina Lopez Saavedra (alias kakaroto)</v-chip>
      <v-avatar size="24">
        <v-icon size="30">mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import UserMenu from './components/UserMenu.vue'

export default {
  name: 'App',
  components: {
    UserMenu,
  },
  data: () => ({
    //
  }),
};
</script>
