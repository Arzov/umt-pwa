<template>
  <div>
    <a-button v-if="this.$store.state.geoLocShow">
      PopUp
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  methods: {
  }
}
</script>

<style scoped>

</style>
