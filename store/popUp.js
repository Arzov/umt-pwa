export const state = () => ({
  togglePopUp: false,
  message: null
})

export const mutations = {
  updateState (state, { key, value }) {
    state[key] = value
  }
}
