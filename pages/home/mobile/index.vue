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
  </div>
</template>

<script>
import Geolocation from '@/components/geoloc'

export default {
  name: 'HomeMobile',
  components: { Geolocation },
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
      const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
      const path = process.env.aws.LAMBDA_ARV_UMT_SEARCH_MATCH
      const params = {
        body: {
          hashKey: this.$store.state.user.geohash,
          matchType: this.$store.state.user.matchType,
          lastKey: this.lastKey
        }
      }

      this.$Amplify.API.post(apiName, path, params).then((response) => {
        console.log(response)
        this.lastKey = JSON.stringify(response.data.LastEvaluatedKey)
        if (!response.data.Count) {
          console.log('No hemos encontrado rival, intentalo mas tarde!')

        // Si el usuario encontrado es el mismo, entonces seguir con la busqueda
        } else if (response.data.Items[0].rangeKey.S === this.$store.state.user.id) {
          this.findMatch()

        // Se encontro un match
        } else {
          // Actualizar estado del usuario
          const path = process.env.aws.LAMBDA_ARV_UMT_UPDATE_USER
          const params = {
            body: {
              hashKey: this.$store.state.user.geohash,
              rangeKey: this.$store.state.user.id,
              matchType: this.$store.state.user.matchType,
              inMatch: true
            }
          }

          this.$Amplify.API.post(apiName, path, params).then((response) => {
            console.log(response)
            this.$store.commit('user/setState', { key: 'inMatch', value: true })
          }).catch((error) => {
            console.log(error)
          })
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
