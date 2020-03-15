import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    VuexBuycarCount: 10,
    userinfo: {
      name: 'liuhai',
      age: '25'
    }
  },
  mutations: {
    changeVuexBuycarCount (state, num) {
      state.VuexBuycarCount = num
    }
  },
  actions: {
    asyncchangeVuexBuycarCount (content, num) {
      setTimeout(() => {
        content.commit('changeVuexBuycarCount', num)
      }, 1000)
    }
  },
  modules: {
  },
  getters: {
    userName (state) {
      return state.userinfo.name
    }
  }
})
