<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <match-mobile :event="event" :matchesList="matchesList" @emit="onEmit($event)" />
    </mq-layout>
  </div>
</template>

<script>
import MatchMobile from './mobile'

/**
 * Evento que pueden emitir las vistas.
 * @type {{TO_CHAT: string, UPDATE_MATCH: string}}
 */
const event = {
  TO_CHAT: 'to_chat',
  UPDATE_MATCH: 'update_match'
}

export default {
  name: 'Match',
  components: { MatchMobile },
  data () {
    return {
      event
    }
  },
  computed: {
    // Listado de encuentros
    matchesList () {
      return this.$store.getters['match/matchesList']
    }
  },
  mounted () {
    this.$store.dispatch('match/getMatches')
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
        
        // Actualizar el estado del match
        case this.event.UPDATE_MATCH:
          this.$store.dispatch('match/updateMatch', event)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
