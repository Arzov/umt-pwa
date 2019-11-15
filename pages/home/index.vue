<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <home-mobile :getDistance="getDistance" :usersFound="userFound" :events="event" @emit="onEmit($event)" />
    </mq-layout>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import HomeMobile from './mobile'
import { searchMatch } from '@/graphql/queries'

/**
 * Evento que pueden emitir las vistas.
 * @type {{SEARCH_MATCH: string}}
 */
const event = {
  SEARCH_MATCH: 'SEARCH_MATCH'
}

function getDistance (lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const p = Math.PI / 180
  const dLat = (lat2 - lat1) * p
  const dLon = (lon2 - lon1) * p
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * p) * Math.cos(lat2 * p) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

// Usar API de Umatch
API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

export default {
  name: 'Home',
  layout: 'app',
  components: { HomeMobile },
  data () {
    return {
      event,
      userFound: [],
      getDistance
    }
  },
  async mounted () {
    try {
      // Obtener usuarios cercanos para hacer match
      const result = await API.graphql(
        graphqlOperation(searchMatch, {
          hashKey: this.$store.state.user.geohash,
          nextToken: this.$store.state.user.matchNextToken,
          birthdate: this.$store.state.user.birthdate,
          matchFilter: this.$store.state.user.matchFilter,
          genderFilter: this.$store.state.user.genderFilter,
          rangeKey: this.$store.state.user.id,
          ageMinFilter: this.$store.state.user.ageMinFilter,
          ageMaxFilter: this.$store.state.user.ageMaxFilter,
          gender: this.$store.state.user.gender
        })
      )

      this.$store.commit('user/setState', { key: 'matchNextToken', value: result.data.searchMatch.nextToken })
      this.userFound = result.data.searchMatch.items
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped>
</style>
