<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      hola
      <a-avatar :src="this.$store.state.userPicture" size="large" />
      {{ this.$store.state.userId }}
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
  </div>
</template>

<script>
export default {
  name: 'HomeMobile',
  methods: {
    toMatches () {
      this.$router.push({
        name: process.env.routes.match.name
      })
    },
    findMatch () {
      const apiName = 'dev'
      const path = '/arv-umt-put-geolocation'
      const myInit = {
        body: {
          hashKey: '-761030',
          userId: 'fjbarrientosg@gmail.com',
          latitude: -33.4178023,
          longitude: -70.6603118
        }
      }

      this.$Amplify.API.post(apiName, path, myInit).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    logOut () {
      this.$Amplify.Auth.signOut({ global: true })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
