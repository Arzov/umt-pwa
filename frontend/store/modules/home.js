import { searchMatch } from '@/graphql/queries'
import { addMatch } from '@/graphql/mutations'
const { getDistance } = require('@/utils/geolocUtils')

const getDefaultState = () => ({
  usersFound: [],
  matchNextToken: null,
  searchingUsers: true
})

const state = getDefaultState()

const getters = {
    usersFound: state => state.usersFound,
    matchNextToken: state => state.matchNextToken,
    searchingUsers: state => state.searchingUsers
}

const actions = {
  /**
   * Busca rivales cercanos al usuario.
   *
   * @param {object} ctx Contexto de Nuxt.
   */
  async searchMatch (ctx) {
    // Verificar si geohash se ha actualizado para poder buscar
    if (ctx.rootState.user.geohash) {
      ctx.commit('setSearchingStatus', true)

      // Usar API de Umatch
      this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

      // Obtener usuarios cercanos para hacer match
      this.$AWS.API.graphql(
        this.$AWS.Query(searchMatch, {
          hashKey: ctx.rootState.user.geohash,
          nextToken: ctx.state.matchNextToken,
          birthdate: ctx.rootState.user.birthdate,
          matchFilter: ctx.rootState.user.matchFilter,
          genderFilter: ctx.rootState.user.genderFilter,
          rangeKey: ctx.rootState.user.email,
          ageMinFilter: ctx.rootState.user.ageMinFilter,
          ageMaxFilter: ctx.rootState.user.ageMaxFilter,
          gender: ctx.rootState.user.gender
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
                      ctx.rootState.user.latitude,
                      ctx.rootState.user.longitude
                  ))
              }
              return userEdited
            })
          }

          ctx.commit('setState', { params })
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          ctx.commit('setSearchingStatus', false)
        })
    } else {
      /**
       * Si el usuario no posee _geohash_ es debido a que aún no ha permitido
       * el acceso a la ubicación desde el navegador.
       */
      console.log('El usuario debe permitir el acceso a la ubicación.')
      ctx.commit('setSearchingStatus', false)
    }
  },

  /**
   * Envia solicitud de _match_ a un rival.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Datos para la solicitud _rangeKey_, _adversaryName_ y _adversaryPicture_.
   */
  requestMatch (ctx, data) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Obtener usuarios cercanos para hacer match
    this.$AWS.API.graphql(
      this.$AWS.Query(addMatch, {
        hashKey: ctx.rootState.user.email,
        rangeKey: data.rangeKey,
        geohash: ctx.rootState.user.geohash,
        creatorName: ctx.rootState.user.firstName,
        creatorPicture: ctx.rootState.user.picture,
        adversaryName: data.adversaryName,
        adversaryPicture: data.adversaryPicture,
        matchFilter: ctx.rootState.user.matchFilter,
        genderFilter: ctx.rootState.user.genderFilter,
        ageMinFilter: ctx.rootState.user.ageMinFilter,
        ageMaxFilter: ctx.rootState.user.ageMaxFilter
      })
    )
      .then((result) => {
      })
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  },

  /**
   * Reinicia estados en valores iniciales.
   *
   * @param {object} ctx Contexto de Nuxt.
   */
  resetStates (ctx) {
    ctx.commit('resetStates')
  }
}

const mutations = {
    setState (state, { params }) {
        // eslint-disable-next-line no-unused-vars
        for (const key in params) {
            state[key] = params[key]
        }
    },
    setSearchingStatus (state, value) {
      state['searchingUsers'] = value
    },
    resetStates (state) {
      Object.assign(state, getDefaultState())
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
