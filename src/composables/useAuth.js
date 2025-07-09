import { ref } from "vue";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

export function useAuth() {
  const user = ref(null);
  const error = ref(null);

  // Observar cambios en el usuario
  onAuthStateChanged(auth, (u) => {
    user.value = u;
  });

  // Iniciar sesión
  const login = async (email, password) => {
    error.value = null;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      user.value = res.user;
    } catch (err) {
      error.value = err.message;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth);
    user.value = null;
  };

  return {
    user,
    error,
    login,
    logout
  };
}
