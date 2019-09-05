export const state = () => ({
  toggle: true,
  message: 'Permitir ubicacion',
  allowBtn: true,
  resetBtn: false
})

export const mutations = {
  setState (state, { key, value }) {
    state[key] = value
  },
  resetStates (state) {
    state.toggle = true
    state.message = 'Permitir ubicacion'
    state.allowBtn = true
    state.resetBtn = false
  }
}
