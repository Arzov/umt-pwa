const state = () => ({
  id: null,
  firstName: null,
  lastName: null,
  birthdate: null,
  gender: null,
  picture: null,
  latitude: null,
  longitude: null,
  geohash: null,
  matchFilter: null,
  genderFilter: null,
  ageMinFilter: null,
  ageMaxFilter: null,
  matchNextToken: null,
  allowGeoloc: false
})

const getters = {
  allowGeoloc: state => state.allowGeoloc,
  coordinates: state => ({ latitude: state.latitude, longitude: state.longitude }),
  userInfoGraphAPI (state) {
    return {
      id: state.user.id,
      genderFilter: state.user.genderFilter,
      matchFilter: state.user.matchFilter,
      ageFilter: state.user.ageFilter
    }
  }
}

const actions = {
}

const mutations = {
  setState (state, { key, value }) {
    state[key] = value
  },
  resetStates (state) {
    state.id = null
    state.firstName = null
    state.lastName = null
    state.birthdate = null
    state.gender = null
    state.picture = null
    state.latitude = null
    state.longitude = null
    state.geohash = null
    state.matchFilter = null
    state.genderFilter = null
    state.ageMinFilter = null
    state.ageMaxFilter = null
    state.matchNextToken = null
    state.allowGeoloc = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
