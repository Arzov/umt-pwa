<template>
  <div id="page-chat-mobile">
    <a-row type="flex" justify="center">
      <div v-for="(msg, index) in mapPosts" :key="index">
        {{ msg.content }}
      </div>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="addMessage">
        AGREGAR MENSAJE
      </a-button>
    </a-row>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { addMessage } from '@/graphql/mutations'
import { getMessages } from '@/graphql/queries'
import { onAddMessage } from '@/graphql/subscriptions'

export default {
  name: 'ChatMobile',
  data () {
    return {
      messages: []
    }
  },
  computed: {
    mapPosts () {
      return this.messages.map((msg, idx) => {
        return msg
      })
    }
  },
  async mounted () {
    try {
      const result = await API.graphql(
        graphqlOperation(getMessages, {
          hashKey: '123',
          nextToken: null
        })
      )
      console.log(result)
      this.messages = result.data.getMessages.items
    } catch (e) {
      console.log(e)
    }

    API.graphql(graphqlOperation(onAddMessage, { hashKey: '123' })).subscribe({
      next: (eventData) => {
        const message = eventData.value.data.onAddMessage
        const result = [
          ...this.messages,
          message
        ]
        this.messages = result
        // console.log(message)
      }
    })
  },
  methods: {
    async addMessage () {
      try {
        const result = await API.graphql(
          graphqlOperation(addMessage, {
            hashKey: '123',
            rangeKey: '2019-08-30 22:42:00',
            author: 'fjbarrientosg@gmail.com',
            content: 'tula'
          })
        )
        console.log(result)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
