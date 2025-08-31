import store from "../store";

export function useAuth() {
  // Para Vue 2, retornamos un objeto con propiedades reactivas que se sincronizan con el store
  return {
    // Estado - getters que se evalúan dinámicamente
    get user() {
      return { value: store.getters['auth/currentUser'] };
    },
    get isAuthenticated() {
      return { value: store.getters['auth/isAuthenticated'] };
    },
    get loading() {
      return { value: store.getters['auth/isLoading'] };
    },
    get error() {
      return { value: store.getters['auth/authError'] };
    },
    
    // Métodos
    initializeAuth() {
      return store.dispatch('auth/initializeAuthListener');
    },
    
    async login(email, password) {
      try {
        await store.dispatch('auth/login', { email, password });
        return true;
      } catch (err) {
        return false;
      }
    },
    
    async logout() {
      try {
        await store.dispatch('auth/logout');
        return true;
      } catch (err) {
        return false;
      }
    },
    
    clearError() {
      store.dispatch('auth/clearError');
    }
  };
}
