import { getMatches } from '@/graphql/queries'
import { updateMatch } from '@/graphql/mutations'
import { onUpdateMatch } from '@/graphql/subscriptions'

const getDefaultState = () => ({
    matchesList: [],
    matchNextToken: null
})

const state = getDefaultState()

const getters = {
    matchesList: state => state.matchesList,
    matchNextToken: state => state.matchNextToken
}

const actions = {
    /**
     * Obtiene los _match_ solicitados o activos del usuario.
     *
     * @param {object} ctx Contexto de Nuxt.
     */
    fetchMatches (ctx) {
        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

        // Obtener usuarios cercanos para hacer match
        this.$AWS.API.graphql(
            this.$AWS.Query(getMatches, {
                hashKey: ctx.rootState.user.email,
                nextToken: ctx.state.matchNextToken
            })
        )
            .then((result) => {
                const params = {
                    matchNextToken: result.data.getMatches.nextToken,
                    matchesList:
                        result.data.getMatches.items.map((match, idx) => {
                            let isCreator = false

                            if (ctx.rootState.user.email === match.matchId.split('#')[0]) {
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

                ctx.commit('setState', { params })
            })
            // eslint-disable-next-line no-console
            .catch(e => console.log(e))
    },

    /**
     * Actualiza una solicitud de _match_.
     *
     * @param {object} ctx Contexto de Nuxt.
     * @param {object} data Datos para actualizar la solicitud _hashKey_, _rangeKey_,
     *                      _matchId_ y _userStatus_.
     */
    updateMatch (ctx, data) {
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
                ctx.dispatch('fetchMatches')
            })
            // eslint-disable-next-line no-console
            .catch(e => console.log(e))
    },

    /**
     * Suscripción de AWS Appsync para obtener eventos dado una actualización de solicitud.
     *
     * @param {object} ctx Contexto de Nuxt.
     */
    onUpdateMatch (ctx) {
        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

        this.$AWS.API.graphql(this.$AWS.Query(onUpdateMatch, {
            rangeKey: ctx.rootState.user.email
        }))
            .subscribe({
                next: (eventData) => {
                    ctx.dispatch('fetchMatches')
                }
            })
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
