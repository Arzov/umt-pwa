<template>
  <div id="page-match-mobile">
    <a-row type="flex" justify="center">
      <ul>
        <li v-for="(match, idx) in mapPosts" :key="idx" @click="toChat(match, idx)">
          {{ match.invitedName }}
        </li>
      </ul>
    </a-row>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { getMatches } from '@/graphql/queries'

export default {
  name: 'MatchMobile',
  data () {
    return {
      matches: []
    }
  },
  computed: {
    mapPosts () {
      return this.matches.map((match, idx) => {
        return match
      })
    }
  },
  async mounted () {
    try {
      const result = await API.graphql(
        graphqlOperation(getMatches, {
          hashKey: this.$store.state.user.id,
          nextToken: null
        })
      )
      this.matches = result.data.getMatches.items
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    toChat (match, idx) {
      this.$router.push({
        name: process.env.routes.chat.name,
        params: { matchId: match.matchId }
      })
    }
  }
}
</script>

<style scoped>

</style>
