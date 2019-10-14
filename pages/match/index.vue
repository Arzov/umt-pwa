<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <match-mobile :events="event" :mapMatches="mapMatch" @emit="onEmit($event)" />
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
const event = {
  TO_CHAT: 'to_chat'
}

export default {
  name: 'Match',
  components: { MatchMobile },
  data () {
    return {
      event,
      matches: []
    }
  },
  computed: {
    // Listado de encuentros
    mapMatch () {
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
     * @param {Object} event Evento emitido por la vista.
     */
    onEmit (event) {
      switch (event.type) {
        // Redireccionar al chat del encuentro seleccionado
        case this.event.TO_CHAT:
          this.$router.push({
            name: process.env.routes.chat.name,
            params: { matchId: event.match.matchId }
          })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
