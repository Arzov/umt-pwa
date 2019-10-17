<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <start-mobile :events="event" @emit="onEmit($event)" />
    </mq-layout>
  </div>
</template>

<script>
import StartMobile from './mobile'

/**
 * Evento que pueden emitir las vistas.
 * @type {{TO_LOGIN: string, TO_REGISTER: string}}
 */
const event = {
  TO_LOGIN: 'to_login',
  TO_REGISTER: 'to_register'
}

export default {
  name: 'Start',
  components: { StartMobile },
  data () {
    return {
      event
    }
  },
  methods: {
    /**
     * Captura eventos generados por las vistas.
     * @param  {Object} event Evento emitido por la vista.
     */
    onEmit (event) {
      switch (event.type) {
        // Redireccionar a la vista Login
        case this.event.TO_LOGIN:
          console.log('Login')
          // this.$router.push(process.env.routes.login.path)
          break

        // Redireccionar a la vista Register
        case this.event.TO_REGISTER:
          console.log('Register')
          // this.$router.push(process.env.routes.register.path)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
