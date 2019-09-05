export const state = () => ({
  toggle: false
})

export const mutations = {
  toggle (state, { key, value }) {
    state[key] = value
  }
}
