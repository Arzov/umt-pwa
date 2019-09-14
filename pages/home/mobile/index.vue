<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      hola
      <a-avatar :src="this.$store.state.user.picture" size="large" />
      {{ this.$store.state.user.id }}
    </a-row>
    <a-button @click="toMatches">
      Matches
    </a-button>
    <a-button @click="findMatch">
      Encontrar partida
    </a-button>
    <a-button @click="logOut">
      Cerrar
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
  data () {
    return {
      lastKey: null
    }
  },
  methods: {
    toMatches () {
      this.$router.push({
        name: process.env.routes.match.name
      })
    },
    findMatch () {
      // Buscar rival
      const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
      let path = process.env.aws.LAMBDA_ARV_UMT_SEARCH_MATCH
      let params = {
        body: {
          hashKey: this.$store.state.user.geohash,
          rangeKey: this.$store.state.user.id,
          matchType: this.$store.state.user.matchType,
          name: this.$store.state.user.firstName
        }
      }

      this.$Amplify.API.post(apiName, path, params).then((response) => {
        console.log('1 Buscar')
        console.log(response)

        switch (response.status) {
          case 'SEARCHING_MATCH':

            // Agregar match
            path = process.env.aws.LAMBDA_ARV_UMT_ADD_MATCH
            params = {
              body: {
                hashKey: this.$store.state.user.geohash,
                rangeKey: this.$store.state.user.id,
                matchType: this.$store.state.user.matchType
              }
            }

            this.$Amplify.API.post(apiName, path, params).then((response) => {
              console.log('2 Agregar')
              console.log(response)

              // Actualizar estado del usuario inMatch = true
              path = process.env.aws.LAMBDA_ARV_UMT_UPDATE_USER
              params = {
                body: {
                  hashKey: this.$store.state.user.geohash,
                  rangeKey: this.$store.state.user.id,
                  matchType: this.$store.state.user.matchType,
                  searching: false,
                  inMatch: true
                }
              }

              this.$Amplify.API.post(apiName, path, params).then((response) => {
                this.$store.commit('user/setState', { key: 'inMatch', value: true })
              }).catch((error) => {
                console.log(error)
              })
            }).catch((error) => {
              console.log(error)
            })
            break

          default:
            console.log('Error desconocido.')
            break
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    logOut () {
      this.$Amplify.Auth.signOut({ global: true })
        .then((data) => {
          this.$store.commit('user/resetStates')
          console.log(data)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
