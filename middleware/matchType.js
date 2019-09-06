// EXPORT
export default ({ store, route }) => {
  const isInStart = (function (path) {
    switch (path) {
      case process.env.routes.start.name:
        return true
      default:
        return false
    }
  })(route.name) // Indica si el usuario se encuentra en la vista Start

  if ((!store.state.user.matchType || store.state.user.matchType === ' ') && !isInStart && !store.state.geoloc.toggle) {
    store.commit('matchType/setState', { key: 'toggle', value: true })
  } else if (isInStart) {
    store.commit('matchType/setState', { key: 'toggle', value: false })
  }
}
