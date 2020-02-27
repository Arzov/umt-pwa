// EXPORT
export default ({ route, store }) => {
    store.commit('navigation/setName', route)
}
