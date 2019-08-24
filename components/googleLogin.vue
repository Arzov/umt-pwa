<template>
  <div>
    <a-button @click="toGoogleLogin">
      Google
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'GoogleLogin',
  methods: {
    toGoogleLogin () {
      this.$Amplify.Auth.federatedSignIn({ provider: 'Google' })
    }
  }
}
</script>

<style scoped>

</style>
