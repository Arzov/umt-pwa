<template>
  <div id="page-match-mobile">
    <a-row v-if="matchesList.length" type="flex" justify="center">
      <ul>
        <li v-for="(match, idx) in matchesList" :key="idx">
          <div v-if="match.isCreator">
            <div v-if="match.matchStatus === 'A'" @click="toChat(match, idx)">
              <a-avatar :src="match.adversaryPicture" size="large" />
              {{ match.adversaryName }}
            </div>
            <div v-else-if="match.matchStatus === 'P'">
              <a-avatar :src="match.adversaryPicture" size="large" />
              {{ match.adversaryName }}
              Pendiente
              <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'C')">
                Cancelar
              </a-button>
            </div>
            <div v-else-if="match.matchStatus === 'D'">
              <a-avatar :src="match.adversaryPicture" size="large" />
              {{ match.adversaryName }}
              Rechazado
              <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'C')">
                Cancelar
              </a-button>
            </div>
          </div>
          <div v-else>
            <div v-if="match.matchStatus === 'A'" @click="toChat(match, idx)">
              <a-avatar :src="match.adversaryPicture" size="large" />
              {{ match.adversaryName }}
            </div>
            <div v-else-if="match.matchStatus === 'P'">
              <a-avatar :src="match.adversaryPicture" size="large" />
              {{ match.adversaryName }}
              Pendiente
              <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'D')">
                Rechazar
              </a-button>
              <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'A')">
                Aceptar
              </a-button>
            </div>
            <div v-else-if="match.matchStatus === 'D'">
              <a-avatar :src="match.adversaryPicture" size="large" />
              {{ match.adversaryName }}
              Rechazado
              <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'C')">
                Cancelar
              </a-button>
            </div>
          </div>
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
    },
    /**
     * Metodo para actualizar el estado del match.
     * @return {Object} Evento de tipo UPDATE_MATCH.
     */
    updateMatch (hashKey, rangeKey, matchId, userStatus) {
      const params = {
        type: this.event.UPDATE_MATCH,
        hashKey,
        rangeKey,
        matchId,
        userStatus
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>

</style>
