<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      <b>INICIO</b>
      <a-avatar :src="this.$store.state.user.picture" size="large" />
    </a-row>
    <a-button @click="toMatches">
      Encuentros
    </a-button>
    <a-button @click="findMatch">
      Buscar Encuentro
    </a-button>
    <Geolocation />
    <MatchType />
  </div>
</template>

<script>
import Geolocation from '@/components/geoloc'
import MatchType from '@/components/matchType'

export default {
  name: 'HomeMobile',
  components: { Geolocation, MatchType },
  props: {
    events: {
      required: true
    }
  },
  data () {
    return {
      lastKey: null
    }
  },
  methods: {
    /**
     * Metodo que re-direcciona a la vista Match.
     * @return {Object} Evento de tipo TO_MATCH.
     */
    toMatches () {
      const params = {
        type: this.events.TO_MATCH
      }
      this.$emit('emit', params)
    },
    /**
     * Metodo que busca un encuentro con algun equipo rival.
     * @return {Object} Evento de tipo FIND_MATCH.
     */
    findMatch () {
      const params = {
        type: this.events.FIND_MATCH
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>
</style>
