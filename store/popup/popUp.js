const state = () => ({
  togglePopUp: false,
  message: null
})

const getters = {
  togglePopUp: state => state.togglePopUp,
  message: state => state.message
}

const mutations = {
  updateState (state, { key, value }) {
    state[key] = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
