import { getMatches } from '@/graphql/queries'
import { updateMatch } from '@/graphql/mutations'
import { onUpdateMatch } from '@/graphql/subscriptions'

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
        nextToken: context.state.matchNextToken
      })
    )
      .then((result) => {
        const params = {
          matchNextToken: result.data.getMatches.nextToken,
          matchesList:
            result.data.getMatches.items.map((match, idx) => {
              let isCreator = false

              if (context.rootState.user.id === match.matchId.split('#')[0]) {
                isCreator = true
              }

              const matchEdited = {
                hashKey: match.hashKey,
                rangeKey: match.rangeKey,
                adversaryName: match.adversaryName,
                adversaryPicture: match.adversaryPicture,
                matchId: match.matchId,
                matchStatus: match.matchStatus,
                createdAt: match.createdAt,
                expireAt: match.expireAt,
                isCreator
              }

              return matchEdited
            })
        }

        context.commit('setState', { params })
      })
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  },
  updateMatch (context, data) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Actualizar el match
    this.$AWS.API.graphql(
      this.$AWS.Query(updateMatch, {
        hashKey: data.hashKey,
        rangeKey: data.rangeKey,
        matchId: data.matchId,
        userStatus: data.userStatus
      })
    )
      .then((result) => {
        // context.dispatch('getMatches')
      })
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  },
  onUpdateMatch (context) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    this.$AWS.API.graphql(this.$AWS.Query(onUpdateMatch, {
      matchId: 'franco.barrientos@arzov.com#fjbarrientosg@gmail.com'
    }))
      .subscribe({
        next: (eventData) => {
          console.log(eventData)
          // context.dispatch('getMatches')
        }
      })
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
