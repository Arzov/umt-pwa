<template>
  <div id="page-match-mobile">
    <a-row v-if="matchesList.length" type="flex" justify="center">
      <ul>
        <li v-for="(match, idx) in matchesList" :key="idx" @click="toChat(match, idx)">
          <a-avatar :src="match.adversaryPicture" size="large" /> {{ match.adversaryName }}
        </li>
      </ul>
    </a-row>
    <a-row v-else type="flex" justify="center">
      No hay solicitudes
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'MatchMobile',
  props: {
    event: {
      required: true
    },
    matchesList: {
      required: true
    }
  },
  methods: {
    /**
     * Metodo que re-direcciona a la vista Chat.
     * @return {Object} Evento de tipo TO_CHAT.
     */
    toChat (match, idx) {
      const params = {
        type: this.event.TO_CHAT,
        match
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>

</style>
