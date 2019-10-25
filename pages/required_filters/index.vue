<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <required-filters-mobile
        :events="event"
        :matches="match"
        :genders="gender"
        :ages="age"
        @emit="onEmit($event)"
      />
    </mq-layout>
  </div>
</template>

<script>
import RequiredFiltersMobile from './mobile'

/**
 * Evento que pueden emitir las vistas.
 * @type {{UPDATE_USER: string, LOGOUT: string}}
 */
const event = {
  UPDATE_USER: 'update_user',
  LOGOUT: 'logout'
}

export default {
  name: 'RequiredFilters',
  components: { RequiredFiltersMobile },
  data () {
    return {
      event,
      match: [
        { name: '5v5', value: '5v5' },
        { name: '7v7', value: '7v7' },
        { name: '11v11', value: '11v11' }
      ],
      gender: [
        { name: 'Hombres', value: 'M' },
        { name: 'Mujeres', value: 'F' }
      ],
      age: {
        min: 18,
        max: 60,
        default: [18, 22]
      }
    }
  },
  methods: {
    /**
     * Captura eventos generados por las vistas.
     * @param  {Object} event Evento emitido por la vista.
     */
    onEmit (event) {
      switch (event.type) {
        case this.event.UPDATE_USER:
          if (event.gender && event.match) {
            const age = Array.from(event.age, x => String(x))

            // Guardar datos en el store del usuario
            this.$store.commit('user/setState', { key: 'matchFilter', value: event.match })
            this.$store.commit('user/setState', { key: 'genderFilter', value: event.gender })
            this.$store.commit('user/setState', { key: 'ageFilter', value: age })

            // Enviar a Home
            this.$router.push(process.env.routes.home.path)
          } else {
            console.log('Debe ingresar todos los datos!')
          }
          break

        case this.event.LOGOUT:
          this.$Amplify.Auth.signOut({ global: true })
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
