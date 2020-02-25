// EXPORT
export default ({ route, store }) => {
    store.commit('navigation/setState', route)
}
