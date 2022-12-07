import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutation'
import state from './state'
import * as getters from './getter'
import actions from './action'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: stateData => ({
    // eslint-disable-line
    logined: stateData.logined,
    user: stateData.user,
    permissions: stateData.permissions,
  }),
})

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [vuexLocal.plugin] : [vuexLocal.plugin],
  strict: debug,
})
