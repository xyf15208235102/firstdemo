export default {
  state: {
    userName: 'xuyunfeng',
    business: 'bjxy',
    num: 123321
  },
  mutations: {
    setUserName (state, payload) {
      state.userName = payload
    },
    changeNum (state, payload) {
      state.num = 2
    }
  },
  actions: {
    login ({ commit }, payload = 'xyf') {
      commit('setUserName', payload)
    }
  }
}
