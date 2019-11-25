const state = () => ({
    toggle: true,
    allow: true
})

const getters = {
    toggle: state => state.toggle,
    allow: state => state.allow
}

const actions = {
    update (context, params) {
        context.commit('setState', { params })
    },
    resetStates (context) {
        context.commit('resetStates')
    }
}

const mutations = {
    setState (state, { params }) {
        // eslint-disable-next-line no-unused-vars
        for (const key in params)
            state[key] = params[key]
    },
    resetStates (state) {
        state.toggle = true
        state.allow = true
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
