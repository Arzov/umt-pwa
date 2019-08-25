<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      hola {{ this.$store.state.userId }}
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'HomeMobile',
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
