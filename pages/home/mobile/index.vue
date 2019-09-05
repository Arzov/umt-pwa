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
          lastKey: null
        }
      }

      this.$Amplify.API.post(apiName, path, params).then((response) => {
        console.log(response)
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
