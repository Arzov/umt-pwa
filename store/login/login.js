const state = () => ({
  loading: false
})

const mutations = {
  setLoading (state, { status }) {
    state.loading = status
  }
}

const actions = {
  signIn (context, params) {
    context.commit('setLoading', { status: true })
    this.$Amplify.Auth.signIn(params)
      .then((user) => {
        console.log(user)
        context.commit('setLoading', { status: false })
        // eslint-disable-next-line no-unused-expressions
        this.$router.push(process.env.routes.home.path)
      })
      .catch((err) => {
        console.log(err)
        context.commit('setLoading', { status: false })
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
