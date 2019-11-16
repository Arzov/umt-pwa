const state = () => ({
  toggle: true,
  allow: true
})

const getters = {
  toggle: state => state.toggle,
  allow: state => state.allow
}

const mutations = {
  setState (state, { key, value }) {
    state[key] = value
  },
  resetStates (state) {
    state.toggle = true
    state.allow = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
