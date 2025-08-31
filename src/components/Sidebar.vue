<template>
  <v-navigation-drawer
    v-model="isOpen"
    app
    clipped
    width="280"
    class="custom-sidebar"
    :temporary="$vuetify.breakpoint.mobile"
  >
    <!-- Header del sidebar -->
    <div class="sidebar-header">
      <div class="d-flex align-center pa-4">
        <v-avatar size="40" class="mr-3">
          <v-img src="../assets/gerepIcon.png" />
        </v-avatar>
        <div>
          <div class="sidebar-title">GEREP</div>
          <div class="sidebar-subtitle">Sistema de Gestión</div>
        </div>
      </div>
    </div>

    <v-divider></v-divider>

    <!-- Menú de navegación -->
    <v-list nav class="sidebar-menu">
      <template v-for="item in menuItems">
        <!-- Item con submenú -->
        <v-list-group
          v-if="item.children"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
          class="sidebar-group"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="sidebar-item-title">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            :to="child.route"
            class="sidebar-subitem"
            @click="handleMenuClick(child)"
          >
            <v-list-item-icon>
              <v-icon color="#C76B6B" small>{{ child.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="sidebar-subitem-title">{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Item normal sin submenú -->
        <v-list-item
          v-else
          :key="item.title"
          :to="item.route"
          class="sidebar-item"
          @click="handleMenuClick(item)"
        >
          <v-list-item-icon>
            <v-icon :color="item.color || '#C76B6B'">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="sidebar-item-title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-divider class="mt-4"></v-divider>

    <!-- Información del usuario al final -->
    <div class="sidebar-footer pa-4">
      <div class="d-flex align-center">
        <v-avatar size="40" class="mr-3">
          <v-icon color="#C76B6B">mdi-account-circle</v-icon>
        </v-avatar>
        <div>
          <div class="user-name">{{ userName }}</div>
          <div class="user-role">Administrador</div>
          <div class="user-email">{{ userEmail }}</div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { useAuthFlow } from '../composables/useAuthFlow';

export default {
  name: 'Sidebar',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Anexos',
          icon: 'mdi-folder-multiple',
          color: '#C76B6B',
          children: [
            {
              title: 'Registro de visitas',
              icon: 'mdi-file-document',
              route: '/anexos/registros'
            },

            {
              title: 'Indicadores',
              icon: 'mdi-chart-bar',
              route: '/anexos/indicadores'
            }
          ]
        },

        {
          title: 'Reportes',
          icon: 'mdi-chart-line',
          color: '#C76B6B',
          children: [
            {
              title: 'Generador',
              icon: 'mdi-file-chart',
              route: '/home'
            },
            {
              title: 'Indicadores',
              icon: 'mdi-chart-donut',
              route: '/reportes/indicadores'
            }
          ]
        }
      ]
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    userName() {
      const user = this.$store.getters['auth/currentUser'];
      if (user && user.email) {
        return user.email.split('@')[0];
      }
      return 'Usuario';
    },
    userEmail() {
      const user = this.$store.getters['auth/currentUser'];
      return user?.email || 'usuario@ejemplo.com';
    }
  },
  methods: {
    handleMenuClick(item) {
      console.log(`Menu item clicked: ${item.title}`);
      if (item.route === '#') {
        console.log(`Navegando a: ${item.title}`);
        // Aquí puedes agregar lógica específica para cada item
      } else if (item.route && item.route !== '#') {
        this.$router.push(item.route).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('Error en navegación:', err);
          }
        });
      }
      // Cerrar sidebar en móvil después de hacer clic
      if (this.$vuetify.breakpoint.mobile) {
        this.isOpen = false;
      }
    }
  }
};
</script>

<style scoped>
/* Sidebar personalizado con paleta rosada */
.custom-sidebar {
  background-color: white !important;
  border-right: 1px solid #f5f5f5 !important;
}

/* Asegurar que el sidebar no se vea deshabilitado */
.custom-sidebar >>> .v-navigation-drawer__content {
  pointer-events: auto !important;
  opacity: 1 !important;
}

.custom-sidebar >>> .v-list-item {
  pointer-events: auto !important;
  cursor: pointer !important;
}

/* Header del sidebar */
.sidebar-header {
  background: linear-gradient(135deg, #C76B6B 0%, #F1A7A7 100%);
  color: white;
}

.sidebar-title {
  font-weight: bold;
  font-size: 16px;
  color: white;
  letter-spacing: 1px;
}

.sidebar-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
}

/* Información del usuario en footer */
.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #C76B6B;
  text-transform: capitalize;
}

.user-role {
  font-size: 12px;
  color: #666;
}

.user-email {
  font-size: 11px;
  color: #999;
}

/* Menú de navegación */
.sidebar-menu {
  padding-top: 8px;
}

.sidebar-item {
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.sidebar-item:hover {
  background-color: rgba(241, 167, 167, 0.1) !important;
}

.sidebar-item.v-list-item--active {
  background-color: rgba(199, 107, 107, 0.1) !important;
  border-left: 3px solid #C76B6B;
}

.sidebar-item-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.sidebar-item.v-list-item--active .sidebar-item-title {
  color: #C76B6B !important;
  font-weight: 600;
}

/* Estilos para grupos y subitems */
.sidebar-group >>> .v-list-group__header {
  padding-left: 16px !important;
}

.sidebar-group >>> .v-list-group__header .v-list-item__icon {
  color: #C76B6B !important;
}

.sidebar-subitem {
  padding-left: 32px !important;
  margin: 2px 8px;
  border-radius: 8px;
}

.sidebar-subitem:hover {
  background-color: rgba(241, 167, 167, 0.1) !important;
}

.sidebar-subitem.v-list-item--active {
  background-color: rgba(199, 107, 107, 0.1) !important;
  border-left: 3px solid #C76B6B;
}

.sidebar-subitem-title {
  font-size: 13px;
  color: #555;
}

.sidebar-subitem.v-list-item--active .sidebar-subitem-title {
  color: #C76B6B !important;
  font-weight: 600;
}

/* Footer del sidebar con datos del usuario */
.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(241, 167, 167, 0.05);
  border-top: 1px solid #f0f0f0;
}

/* Dividers con color personalizado */
.v-divider {
  border-color: rgba(241, 167, 167, 0.3) !important;
}

/* Responsive */
@media (max-width: 960px) {
  .custom-sidebar {
    width: 100% !important;
    max-width: 280px;
  }
}
</style>
