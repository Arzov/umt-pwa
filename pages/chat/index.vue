<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <chat-mobile :events="events" :mapMessages="mapMessages" @emit="onEmit($events)" />
    </mq-layout>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import ChatMobile from './mobile'
import { addMessage } from '@/graphql/mutations'
import { getMessages } from '@/graphql/queries'
import { onAddMessage } from '@/graphql/subscriptions'

/**
 * Evento que pueden emitir las vistas.
 * @type {{ADD_MESSAGE: string}}
 */
const events = {
  ADD_MESSAGE: 'add_message'
}

export default {
  name: 'Chat',
  components: { ChatMobile },
  data () {
    return {
      events,
      messages: []
    }
  },
  computed: {
    mapMessages () {
      return this.messages.map((msg, idx) => {
        return msg
      })
    }
  },
  async mounted () {
    try {
      const result = await API.graphql(
        graphqlOperation(getMessages, {
          hashKey: this.$route.params.matchId,
          nextToken: null
        })
      )
      this.messages = result.data.getMessages.items.reverse()
    } catch (e) {
      console.log(e)
    }

    API.graphql(graphqlOperation(onAddMessage, {
      hashKey: this.$route.params.matchId
    })).subscribe({
      next: (eventData) => {
        const message = eventData.value.data.onAddMessage
        const result = [
          ...this.messages,
          message
        ]
        this.messages = result
      }
    })
  },
  methods: {
    /**
     * Captura eventos generados por las vistas.
     * @param  {Object} events Evento emitido por la vista.
     */
    onEmit (events) {
      switch (events.type) {
        case this.events.ADD_MESSAGE:
          try {
            API.graphql(
              graphqlOperation(addMessage, {
                hashKey: this.$route.params.matchId,
                author: this.$store.state.user.id,
                authorName: this.$store.state.user.firstName,
                content: events.userMessage
              })
            )
          } catch (e) {
            console.log(e)
          }
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
