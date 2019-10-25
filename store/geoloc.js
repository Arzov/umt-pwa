export const state = () => ({
  toggle: true,
  allow: true
})

export const mutations = {
  setState (state, { key, value }) {
    state[key] = value
  },
  resetStates (state) {
    state.toggle = true
    state.allow = true
  }
}
