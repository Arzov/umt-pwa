import { searchMatch } from '@/graphql/queries'

const state = () => ({
  usersFound: [],
  matchNextToken: null
})

const getters = {
  usersFound: state => state.usersFound,
  matchNextToken: state => state.matchNextToken
}

const actions = {
  searchMatch (context) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Obtener usuarios cercanos para hacer match
    this.$AWS.API.graphql(
      this.$AWS.Query(searchMatch, {
        hashKey: context.rootState.user.geohash,
        nextToken: context.state.matchNextToken,
        birthdate: context.rootState.user.birthdate,
        matchFilter: context.rootState.user.matchFilter,
        genderFilter: context.rootState.user.genderFilter,
        rangeKey: context.rootState.user.id,
        ageMinFilter: context.rootState.user.ageMinFilter,
        ageMaxFilter: context.rootState.user.ageMaxFilter,
        gender: context.rootState.user.gender
      })
    )
      .then((result) => {
        const params = {
          matchNextToken: result.data.searchMatch.nextToken,
          usersFound: result.data.searchMatch.items
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
    state.usersFound = []
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
