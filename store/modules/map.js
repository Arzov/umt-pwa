const state = () => ({
  position: {
    lat: null,
    lng: null
  }
})

const getters = {
  position: state => state.position
}

const actions = {
  setPosition (context, data) {
    const params = data
    context.commit('setState', { params })
  }
}

const mutations = {
  setState (state, { params }) {
    // eslint-disable-next-line no-unused-vars
    for (const key in params) {
      state[key] = params[key]
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
