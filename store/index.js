import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
  userId: null,
  userFirstName: null,
  userLastName: null,
  userPicture: null,
  userLatitude: null,
  userLongitude: null,
  userGeohash: null,
  geoLocShow: false
})

export const mutations = {
  updateState (state, { key, value }) {
    state[key] = value
  }
}

export const plugins = [
  createPersistedState()
]
