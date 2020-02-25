const state = () => ({
    name: undefined
})

const mutations = {
    setState (state, { name }) {
        state['name'] = name
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
