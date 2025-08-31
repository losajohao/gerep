import { auth } from '../../utils/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  namespaced: true,
  
  state: {
    user: null,
    loading: false,
    error: null,
    isInitialized: false
  },
  
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    isLoading: state => state.loading,
    authError: state => state.error,
    isAuthInitialized: state => state.isInitialized
  },
  
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    
    SET_ERROR(state, error) {
      state.error = error
    },
    
    CLEAR_ERROR(state) {
      state.error = null
    },
    
    SET_INITIALIZED(state, initialized) {
      state.isInitialized = initialized
    }
  },
  
  actions: {
    // Inicializar listener de autenticación
    initializeAuthListener({ commit, state }) {
      // Si ya está inicializado, no crear otro listener
      if (state.isInitialized) {
        return Promise.resolve(state.user);
      }
      
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          commit('SET_USER', user)
          commit('SET_INITIALIZED', true)
          resolve(user)
          // No desuscribirse aquí, queremos mantener el listener activo
        })
        
        // Guardar el unsubscribe para limpieza posterior si es necesario
        // En este caso lo mantenemos activo durante toda la app
      })
    },
    
    // Login
    async login({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        commit('SET_USER', userCredential.user)
        return userCredential.user
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // Logout
    async logout({ commit }) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      
      try {
        await signOut(auth)
        commit('SET_USER', null)
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    // Limpiar errores
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    }
  }
}
