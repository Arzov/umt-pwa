export const state = () => ({
  id: null,
  firstName: null,
  lastName: null,
  birthdate: null,
  gender: null,
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
        state[key] = key === 'allowGeoloc' || key === 'inMatch' ? state[key] : null
      }
    }
    /* eslint-enable no-unused-vars */
  }
}
