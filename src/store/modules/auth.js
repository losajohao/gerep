import { auth } from '../../utils/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

export default {
  namespaced: true,
  
  state: {
    user: null,
    loading: false,
    error: null
  },
  
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    isLoading: state => state.loading,
    authError: state => state.error
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
    }
  },
  
  actions: {
    // Inicializar listener de autenticación
    initializeAuthListener({ commit }) {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          commit('SET_USER', user)
          resolve(user)
        })
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
