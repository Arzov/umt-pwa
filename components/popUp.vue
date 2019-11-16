<template>
  <div v-if="this.$store.getters['popup/togglePopUp']">
    <a-button>
      {{ this.$store.getters['popup/message'] }}
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
