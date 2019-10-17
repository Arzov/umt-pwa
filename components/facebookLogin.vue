<template>
  <div>
    <a-button @click="toFacebookLogin">
      Facebook
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'FacebookLogin',
  methods: {
    toFacebookLogin () {
      this.$Amplify.Auth.federatedSignIn({ provider: 'Facebook' })
    }
  }
}
</script>

<style scoped>

</style>
