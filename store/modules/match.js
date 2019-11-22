import { getMatches } from '@/graphql/queries'

const state = () => ({
  matchesList: [],
  matchNextToken: null
})

const getters = {
  matchesList: state => state.matchesList,
  matchNextToken: state => state.matchNextToken
}

const actions = {
  getMatches (context) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Obtener usuarios cercanos para hacer match
    this.$AWS.API.graphql(
      this.$AWS.Query(getMatches, {
        hashKey: context.rootState.user.id,
        nextToken: context.state.matchNextToken,
      })
    )
      .then((result) => {
        const params = {
          matchNextToken: result.data.getMatches.nextToken,
          matchesList: result.data.getMatches.items
        }

        context.commit('setState', { params })
      })
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  },
  resetStates (context) {
    context.commit('resetStates')
  }
}

const mutations = {
  setState (state, { params }) {
    // eslint-disable-next-line no-unused-vars
    for (const key in params) {
      state[key] = params[key]
    }
  },
  resetStates (state) {
    state.matchesList = []
    state.matchNextToken = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
