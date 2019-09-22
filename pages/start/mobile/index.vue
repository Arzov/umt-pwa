<template>
  <div id="page-start-mobile">
    <a-row type="flex" justify="center">
      <a-button @click="toLogin">
        Iniciar Sesión
      </a-button>
      <a-button @click="toRegister">
        Registrar
      </a-button>
      <a-divider>
        O inicia con
      </a-divider>
      <FacebookLogin />
      <GoogleLogin />
      <!-- PRUEBAS -->
      <a-button @click="logOut">
        Cerrar
      </a-button>
      <a-button @click="registerTest">
        registrar
      </a-button>
      <a-button @click="codeVer">
        verificar
      </a-button>
      <a-button @click="login">
        iniciar
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
    events: {
      required: true
    }
  },
  methods: {
    /**
    * Metodo que re-direcciona a la vista Login.
    * Emite evento de tipo TO_LOGIN.
    */
    toLogin () {
      const params = {
        type: this.events.TO_LOGIN
      }
      this.$emit('emit', params)
    },
    /**
    * Metodo que re-direcciona a la vista Register.
    * Emite evento de tipo TO_REGISTER.
    */
    toRegister () {
      const params = {
        type: this.events.TO_REGISTER
      }
      this.$emit('emit', params)
    },
    // PRUEBA
    logOut () {
      this.$Amplify.Auth.signOut({ global: true })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    },
    registerTest () {
      this.$Amplify.Auth.signUp({
        username: 'fjbarrientosg@gmail.com',
        password: '123456',
        attributes: {
          email: 'fjbarrientosg@gmail.com',
          name: 'Franco'
        }
      })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    },
    codeVer () {
      this.$Amplify.Auth.confirmSignUp('fjbarrientosg@gmail.com', '348115', {
        forceAliasCreation: true
      }).then(data => console.log(data))
        .catch(err => console.log(err))
    },
    login () {
      this.$Amplify.Auth.signIn({
        username: 'fjbarrientosg@gmail.com',
        password: '123456'
      }).then(user => console.log(user))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
