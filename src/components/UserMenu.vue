<template>
  <v-menu
    bottom
    left
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-chip class="mr-2" small>Usuario</v-chip>
        <v-avatar size="24">
          <v-icon size="20">mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title>Usuario</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Perfil' },
        { title: 'Configuración' },
        { title: 'Cerrar sesión' },
      ],
    }
  },
}
</script>
