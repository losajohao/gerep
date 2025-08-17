<template>
  <v-footer
    app
    color="white"
    elevation="0"
    class="app-footer"
    height="40"
  >
    <v-container fluid class="py-0">
      <v-row align="center" justify="center" no-gutters>
        <v-col class="text-center">
          <span class="footer-text">
            Copyright © 2025 Losa - Todos los derechos reservados
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  border-top: 1px solid #f9f9f9;
  background-color: #fafafa !important;
}

.footer-text {
  font-size: 10px;
  color: #aaa;
  font-weight: 300;
  letter-spacing: 0.2px;
  opacity: 0.8;
}

.footer-text:hover {
  color: #C76B6B;
  opacity: 1;
  transition: all 0.2s ease;
}
</style>
