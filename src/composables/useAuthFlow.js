import store from "../store";

export function useAuthFlow() {
  // Redireccionar a home de manera segura
  const redirectToHome = (vueInstance) => {
    if (vueInstance.$route.path !== '/home') {
      vueInstance.$router.push('/home').catch(err => {
        // Manejar errores de navegación redundante silenciosamente
        if (err.name !== 'NavigationDuplicated') {
          console.error('Error en navegación:', err);
        }
      });
    }
  };

  // Redireccionar a login
  const redirectToLogin = (vueInstance) => {
    if (vueInstance.$route.path !== '/login') {
      vueInstance.$router.push('/login').catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.error('Error en navegación:', err);
        }
      });
    }
  };

  // Manejar login exitoso
  const handleLoginSuccess = (vueInstance) => {
    // Verificar si el usuario está autenticado y redirigir
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    if (isAuthenticated && vueInstance) {
      redirectToHome(vueInstance);
    }
    console.log('Login exitoso');
  };

  // Manejar logout
  const handleLogout = async (vueInstance) => {
    await store.dispatch('auth/logout');
    if (vueInstance) {
      redirectToLogin(vueInstance);
    }
  };

  return {
    redirectToHome,
    redirectToLogin,
    handleLoginSuccess,
    handleLogout
  };
}
