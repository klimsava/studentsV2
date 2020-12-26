import Vue from 'vue'
import Vuex from 'vuex'
import courses from './courses'

Vue.use(Vuex)

export  default new Vuex.Store({
  modules: { courses }
})