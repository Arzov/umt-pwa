<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      hola {{ this.$store.state.userId }}
    </a-row>
    <a-button @click="toMatch">
      Matches
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
    }
  }
}
</script>

<style scoped>

</style>
