import Vue from 'vue'
import Vuex from 'vuex'
import app from './module/app'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: 'head',
    count: 0,
    num: '123'
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
    },
    changeNum (state, payload) {
      state.num = payload
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
    app
  }
})
