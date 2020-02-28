const state = () => ({
    name: undefined,
    title: undefined,
    toUrl: undefined
})

const mutations = {
    setName (state, { name }) {
        state['name'] = name
    },
    setTitle (state, value) {
        state['title'] = value
    },
    setUrl (state, value) {
        state['toUrl'] = value
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
