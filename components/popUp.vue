<template>
  <div v-if="this.$store.state.popUp.togglePopUp">
    <a-button>
      {{ this.$store.state.popUp.message }}
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
