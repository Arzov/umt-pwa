<template>
  <div id="page-chat-mobile">
    <a-row type="flex" justify="center">
      <ul>
        <li v-for="(msg, idx) in mapPosts" :key="idx">
          {{ msg.content }}
        </li>
      </ul>
    </a-row>
    <a-row type="flex" justify="center">
      <form class="review-form" @submit.prevent="addMessage">
        <input v-model="userMessage" placeholder="mensaje">
        <input type="submit" value="Submit">
      </form>
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
      userMessage: null,
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
    async addMessage () {
      try {
        await API.graphql(
          graphqlOperation(addMessage, {
            hashKey: this.$route.params.matchId,
            author: this.$store.state.userId,
            authorName: this.$store.state.userFirstName,
            content: this.userMessage
          })
        )
        this.userMessage = null
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
