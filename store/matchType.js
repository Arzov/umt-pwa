export const state = () => ({
  toggle: false
})

export const mutations = {
  setState (state, { key, value }) {
    state[key] = value
  }
}
