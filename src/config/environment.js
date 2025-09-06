// Configuración de ambientes
export const Environment = {
  // Detectar si estamos en producción
  isProduction() {
    return window.location.hostname.includes('vercel.app');
  },

  // Obtener el ambiente actual
  getCurrentEnvironment() {
    return this.isProduction() ? 'production' : 'development';
  },

  // Obtener nombre de colección según ambiente
  getCollectionName(baseName) {
    return this.isProduction() ? baseName : `dev_${baseName}`;
  },

};
