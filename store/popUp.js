export const state = () => ({
  togglePopUp: false
})

export const mutations = {
  updateState (state, { key, value }) {
    state[key] = value
  }
}
