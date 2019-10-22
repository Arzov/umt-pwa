<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <match-mobile :events="events" :mapMatches="mapMatches" @emit="onEmit($events)" />
    </mq-layout>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import MatchMobile from './mobile'
import { getMatches } from '@/graphql/queries'

/**
 * Evento que pueden emitir las vistas.
 * @type {{TO_CHAT: string}}
 */
const events = {
  TO_CHAT: 'to_chat'
}

export default {
  name: 'Match',
  components: { MatchMobile },
  data () {
    return {
      events,
      matches: []
    }
  },
  computed: {
    // Listado de encuentros
    mapMatches () {
      return this.matches.map((match, idx) => {
        return match
      })
    }
  },
  async mounted () {
    try {
      // Obtener listado de encuentros del usuario
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
    /**
     * Captura eventos generados por las vistas.
     * @param {Object} events Evento emitido por la vista.
     */
    onEmit (events) {
      switch (events.type) {
        // Redireccionar al chat del encuentro seleccionado
        case this.events.TO_CHAT:
          this.$router.push({
            name: process.env.routes.chat.name,
            params: { matchId: events.match.matchId }
          })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
