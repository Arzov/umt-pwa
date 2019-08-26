import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  userId: null,
  userFirstName: null,
  userLastName: null
})

export const mutations = {
  updateUser (state, { key, value }) {
    state[key] = value
  }
}

export const plugins = [
  createPersistedState()
]
