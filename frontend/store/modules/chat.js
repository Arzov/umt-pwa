import { addMessage } from '@/graphql/mutations'
import { getMessages } from '@/graphql/queries'
import { onAddMessage } from '@/graphql/subscriptions'

const state = () => ({
    matchInfo: null,
    messagesList: [],
    messageNextToken: null
})

const getters = {
  matchInfo: state => state.matchInfo,
  messagesList: state => state.messagesList,
  messageNextToken: state => state.messageNextToken
}

const actions = {
    fetchMessages (ctx) {
        // TODO: Revisar porque solo se reinicia _messagesList_ y _messageNextToken_
        ctx.commit('resetState')

        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.NUXT_ENV_AWS_APPSYNC_UMATCH_URL

        // Obtener usuarios cercanos para hacer match
        this.$AWS.API.graphql(
        this.$AWS.Query(getMessages, {
            hashKey: ctx.state.matchInfo.matchId,
            nextToken: ctx.state.messageNextToken
        })
        )
        .then((result) => {
            const params = {
                messageNextToken: result.data.getMessages.nextToken,
                messagesList: result.data.getMessages.items.reverse()
            }

            ctx.commit('setState', { params })
        })
        // eslint-disable-next-line no-console
        .catch(e => console.log(e))
    },
    sendMessage (ctx, data) {
        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.NUXT_ENV_AWS_APPSYNC_UMATCH_URL

        this.$AWS.API.graphql(
        this.$AWS.Query(addMessage, {
            hashKey: ctx.state.matchInfo.matchId,
            author: ctx.rootState.user.email,
            authorName: ctx.rootState.user.firstName,
            content: data.userMessage
        })
        )
        .then((result) => {
        })
        // eslint-disable-next-line no-console
        .catch(e => console.log(e))
    },
    onAddMessage (ctx) {
        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.NUXT_ENV_AWS_APPSYNC_UMATCH_URL

        this.$AWS.API.graphql(this.$AWS.Query(onAddMessage, {
        hashKey: ctx.state.matchInfo.matchId
        }))
        .subscribe({
            next: (eventData) => {
            const message = eventData.value.data.onAddMessage
            const newMessages = [
                ...ctx.state.messagesList,
                message
            ]
            const params = {
                messagesList: newMessages
            }
            
            ctx.commit('setState', { params })
            }
        })
    },
    setMatchInfo (ctx, data) {
        const params = data
        ctx.commit('setState', { params })
    }
}

const mutations = {
    setState (state, { params }) {
        // eslint-disable-next-line no-unused-vars
        for (const key in params)
            state[key] = params[key]
    },
    resetState (state) {
        state.messagesList = []
        state.messageNextToken = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
