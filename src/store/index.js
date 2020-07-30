import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: 'head',
    count: 0
  },
  mutations: {
    aaa (state, payload) {
      state.text = payload
    },
    bbb () {
      console.log(222)
    },
    addCount (state, payload) {
      state.count += 5
    }
  },
  actions: {
    asyncaaa (store, payload) {
      setTimeout(() => {
        store.commit('aaa', payload)
      }, 2000)
    }
  },
  modules: {
  }
})
