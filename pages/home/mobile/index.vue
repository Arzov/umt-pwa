<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      hola
      <a-avatar :src="this.$store.state.userPicture" size="large" />
      {{ this.$store.state.userId }}
    </a-row>
    <a-button @click="toMatch">
      Matches
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
    toMatch () {
      this.$router.push({
        name: process.env.routes.match.name
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
