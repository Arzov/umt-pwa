<template>
  <div id="page-start-mobile">
    <a-row type="flex" justify="center">
      <a-button @click="toLogin">
        Iniciar Sesión
      </a-button>
      <FacebookLogin />
      <GoogleLogin />
      <a-button @click="toRegister">
        ¿No tienes cuenta? Regístrate.
      </a-button>
    </a-row>
  </div>
</template>

<script>
import FacebookLogin from '@/components/facebookLogin'
import GoogleLogin from '@/components/googleLogin'

export default {
  name: 'StartMobile',
  components: { FacebookLogin, GoogleLogin },
  props: {
    event: {
      required: true
    }
  },
  methods: {
    /**
     * Metodo que re-direcciona a la vista Login.
     * @return {Object} Evento de tipo TO_LOGIN.
     */
    toLogin () {
      const params = {
        type: this.event.TO_LOGIN
      }
      this.$emit('emit', params)
    },
    /**
     * Metodo que re-direcciona a la vista Register.
     * @return {Object} Evento de tipo TO_REGISTER.
     */
    toRegister () {
      const params = {
        type: this.event.TO_REGISTER
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>

</style>
