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
  getMessages (context) {
    // Reset state
    context.commit('resetState')

    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Obtener usuarios cercanos para hacer match
    this.$AWS.API.graphql(
      this.$AWS.Query(getMessages, {
        hashKey: context.state.matchInfo.matchId,
        nextToken: context.state.messageNextToken
      })
    )
      .then((result) => {
        const params = {
          messageNextToken: result.data.getMessages.nextToken,
          messagesList: result.data.getMessages.items.reverse()
        }

        context.commit('setState', { params })
      })
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  },
  addMessage (context, data) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    this.$AWS.API.graphql(
      this.$AWS.Query(addMessage, {
        hashKey: context.state.matchInfo.matchId,
        author: context.rootState.user.id,
        authorName: context.rootState.user.firstName,
        content: data.userMessage
      })
    )
      .then((result) => {
      })
      // eslint-disable-next-line no-console
      .catch(e => console.log(e))
  },
  onAddMessage (context) {
    // Usar API de Umatch
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    this.$AWS.API.graphql(this.$AWS.Query(onAddMessage, {
      hashKey: context.state.matchInfo.matchId
    }))
      .subscribe({
        next: (eventData) => {
          const message = eventData.value.data.onAddMessage
          const newMessages = [
            ...context.state.messagesList,
            message
          ]
          const params = {
            messagesList: newMessages
          }
          
          context.commit('setState', { params })
        }
      })
  },
  setMatchInfo (context, data) {
    const params = data
    context.commit('setState', { params })
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
