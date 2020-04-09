import { updateUmatchUser } from '@/graphql/mutations'

const actions = {
  /**
   * Guarda filtros del usuario.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Filtros a guardar _match_, _gender_, _age_.
   */
  saveFilters (ctx, data) {
    const ageFilter = Array.from(data.ageFilter, x => String(x))

    /**
     * Si el usuario esta ingresando por primera vez a la app su _geohash_
     * será nulo, ya que este parámetro se completará después en la vista [Home](#home)
     * cuando el usuario permita el acceso a su ubicación (en ese instante se
     * creará recién el usuario en AWS DynamoDB en la tabla UMT_USERS) por tanto
     * sólo se guardan los filtros a nivel del store de Vuex y no de AWS DynamoDB. En caso contrario,
     * implica que el usuario está gatillando este método desde la vista [Profile](#profile)
     * y en este caso se podrá almacenar en AWS DynamoDB los cambios del usuario.
     */
    if (!ctx.rootState.user.geohash) {
      const params = {
        matchFilter: data.matchFilter,
        genderFilter: data.genderFilter,
        ageMinFilter: Number(ageFilter[0]),
        ageMaxFilter: Number(ageFilter[1])
      }

      ctx.commit('user/setState', { params }, { root: true })
    } else {
      // Usar API de Umatch
      this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

      // Actualizar datos del usuario
      this.$AWS.API.graphql(
          this.$AWS.Query(updateUmatchUser, {
              hashKey: ctx.rootState.user.geohash,
              rangeKey: ctx.rootState.user.email,
              genderFilter: data.genderFilter,
              ageMinFilter: ageFilter[0],
              ageMaxFilter: ageFilter[1],
              matchFilter: data.matchFilter
          })
      )
          .then((result) => {
              const params = {
                  matchFilter: data.matchFilter,
                  genderFilter: data.genderFilter,
                  ageMinFilter: Number(ageFilter[0]),
                  ageMaxFilter: Number(ageFilter[1])
              }

              ctx.commit('user/setState', { params }, { root: true })
          })
          // eslint-disable-next-line no-console
          .catch(e => console.log(e))
    }
  }
}

export default {
  namespaced: true,
  actions
}
