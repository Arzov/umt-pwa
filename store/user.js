export const state = () => ({
  id: null,
  firstName: null,
  lastName: null,
  picture: null,
  latitude: null,
  longitude: null,
  geohash: null,
  matchType: null,
  allowGeoloc: false
})

export const mutations = {
  setState (state, { key, value }) {
    state[key] = value
  },
  resetStates (state) {
    /* eslint-disable no-unused-vars */
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        state[key] = key === 'allowGeoloc' ? state[key] : null
      }
    }
    /* eslint-enable no-unused-vars */
  }
}
