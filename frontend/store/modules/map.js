import { getCourts } from '@/graphql/queries'

const state = () => ({
    position: {
        lat: null,
        lng: null
    },
    courtsList: [],
    courtNextToken: null
})

const getters = {
    position: state => state.position,
    courtsList: state => state.courtsList
}

const actions = {
    /**
     * Guarda posicion actual del usuario para centrar el mapa en esa posicion.
     *
     * @param {object} ctx Contexto de Nuxt.
     * @param {object} data Datos con la latitud y longitud del usuario.
     */
    setPosition (ctx, data) {
        const params = data
        ctx.commit('setState', { params })
    },

    /**
     * Obtiene las canchas cercanas desde servidor.
     *
     * @param {object} ctx Contexto de Nuxt.
     */
    fetchCourts (ctx) {
        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

        // Obtener canchas cercanas
        this.$AWS.API.graphql(
        this.$AWS.Query(getCourts, {
            hashKey: ctx.rootState.user.geohash,
            matchType: ctx.rootState.user.matchFilter,
            nextToken: ctx.state.courtNextToken
        })
        )
        .then((result) => {
            const params = {
                courtNextToken: result.data.getCourts.nextToken,
                courtsList: result.data.getCourts.items
            }

            ctx.commit('setState', { params })
        })
        // eslint-disable-next-line no-console
        .catch(e => console.log(e))
    }
}

const mutations = {
    setState (state, { params }) {
        // eslint-disable-next-line no-unused-vars
        for (const key in params) {
            state[key] = params[key]
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
