<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <chat-mobile :events="event" :map-messages="mapMessage" @emit="onEmit($event)" />
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
const event = {
  ADD_MESSAGE: 'add_message'
}

export default {
  name: 'Chat',
  components: { ChatMobile },
  data () {
    return {
      event,
      messages: []
    }
  },
  computed: {
    mapMessage () {
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
     * @param  {Object} event Evento emitido por la vista.
     */
    onEmit (event) {
      switch (event.type) {
        case this.event.ADD_MESSAGE:
          try {
            API.graphql(
              graphqlOperation(addMessage, {
                hashKey: this.$route.params.matchId,
                author: this.$store.state.user.id,
                authorName: this.$store.state.user.firstName,
                content: event.userMessage
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
