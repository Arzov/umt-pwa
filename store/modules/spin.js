const state = () => ({
    loading: false
})

const actions = {
    setSpin: {
        root: true,
        handler (context, { value }) {
            console.log(context)
            console.log(value)
        }
    }
}

const mutations = {
    setState (state, value) {
        state.loading = value
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
