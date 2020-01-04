import { searchMatch } from '@/graphql/queries'
import { addMatch } from '@/graphql/mutations'
import getDistance from '@/utils/getDistance'

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
    // Verificar si geohash se ha actualizado para poder buscar
    if (context.rootState.user.geohash) {
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
            usersFound: result.data.searchMatch.items.map((user, idx) => {
              const userEdited = {
                  hashKey: user.hashKey,
                  firstName: user.firstName,
                  age: user.age,
                  picture: user.picture,
                  distance: Math.round(getDistance(
                      user.geoJson[1],
                      user.geoJson[0],
                      context.rootState.user.latitude,
                      context.rootState.user.longitude
                  ))
              }
              return userEdited
            })
          }

          context.commit('setState', { params })
        })
        // eslint-disable-next-line no-console
        .catch(e => console.log(e))
    } else {
      console.log('aun se debe actualizar el geohash segun geoloc')
    }
  },
  addMatch (context, data) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Obtener usuarios cercanos para hacer match
    this.$AWS.API.graphql(
      this.$AWS.Query(addMatch, {
        hashKey: context.rootState.user.id,
        rangeKey: data.rangeKey,
        geohash: context.rootState.user.geohash,
        creatorName: context.rootState.user.firstName,
        creatorPicture: context.rootState.user.picture,
        adversaryName: data.adversaryName,
        adversaryPicture: data.adversaryPicture,
        matchFilter: context.rootState.user.matchFilter,
        genderFilter: context.rootState.user.genderFilter,
        ageMinFilter: context.rootState.user.ageMinFilter,
        ageMaxFilter: context.rootState.user.ageMaxFilter
      })
    )
      .then((result) => {
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
