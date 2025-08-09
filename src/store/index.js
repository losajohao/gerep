import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import stepper from './modules/stepper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Estado global de la aplicación
  },
  getters: {
    // Getters globales
  },
  mutations: {
    // Mutaciones globales
  },
  actions: {
    // Acciones globales
  },
  modules: {
    auth,
    stepper
  }
})
