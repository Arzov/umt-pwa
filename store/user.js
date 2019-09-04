export const state = () => ({
  userId: null,
  userFirstName: null,
  userLastName: null,
  userPicture: null,
  userLatitude: null,
  userLongitude: null,
  userGeohash: null
})

export const mutations = {
  updateState (state, { key, value }) {
    state[key] = value
  },
  resetStates (state) {
    /* eslint-disable no-unused-vars */
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        state[key] = null
      }
    }
    /* eslint-enable no-unused-vars */
  }
}
