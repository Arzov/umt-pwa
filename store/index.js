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
