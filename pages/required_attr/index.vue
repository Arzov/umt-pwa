<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <required-attr-mobile
        :events="event"
        :genders="gender"
        :days="day"
        :months="month"
        :years="year"
        @emit="onEmit($event)"
      />
    </mq-layout>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import RequiredAttrMobile from './mobile'
import { updateUser } from '@/graphql/mutations'

/**
 * Evento que pueden emitir las vistas.
 * @type {{UPDATE_USER: string, LOGOUT: string}}
 */
const event = {
  UPDATE_USER: 'update_user',
  LOGOUT: 'logout'
}

// Usar API de Arzov
API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

export default {
  name: 'RequiredAttr',
  components: { RequiredAttrMobile },
  data () {
    return {
      event,
      gender: [
        { name: 'Masculino', value: 'M' },
        { name: 'Femenino', value: 'F' }
      ],
      month: [
        { name: 'Enero', value: '01' },
        { name: 'Febrero', value: '02' },
        { name: 'Marzo', value: '03' },
        { name: 'Abril', value: '04' },
        { name: 'Mayo', value: '05' },
        { name: 'Junio', value: '06' },
        { name: 'Julio', value: '07' },
        { name: 'Agosto', value: '08' },
        { name: 'Septiembre', value: '09' },
        { name: 'Octubre', value: '10' },
        { name: 'Noviembre', value: '11' },
        { name: 'Diciembre', value: '12' }
      ]
    }
  },
  computed: {
    day () {
      return Array.from({ length: 31 }, (value, index) => {
        const d = 1 + index

        if (d < 10) { return '0' + String(d) } else { return String(d) }
      })
    },
    year () {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 1899 }, (value, index) => 1900 + index).reverse()
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
          try {
            if (event.gender && event.birthDay && event.birthMonth && event.birthYear) {
              // Revisar que la fecha de nacimiento sea la correcta
              const birthdate = String(event.birthYear) + '-' + event.birthMonth + '-' + event.birthDay
              const validBirthdate = new Date(event.birthYear, (+event.birthMonth - 1), event.birthDay)

              // Fecha invalida (solo se valida mes de febrero donde podria haber error)
              if (validBirthdate.getMonth() !== (+event.birthMonth - 1)) {
                console.log('Debe ingresar una fecha valida!')

              // Fecha valida
              } else {
                // Validar mayoria de edad (18 anos)
                const today = new Date()
                let age = today.getFullYear() - validBirthdate.getFullYear()
                const m = today.getMonth() - validBirthdate.getMonth()

                if (m < 0 || (m === 0 && today.getDate() < validBirthdate.getDate())) {
                  age--
                }

                if (age < 18) {
                  console.log('Debe ser mayor de 18 anos!')
                } else {
                  // Actualizar datos del usuario
                  try {
                    API.graphql(
                      graphqlOperation(updateUser, {
                        hashKey: this.$store.state.user.id,
                        firstName: this.$store.state.user.firstName,
                        lastName: this.$store.state.user.lastName,
                        picture: this.$store.state.user.picture,
                        birthdate,
                        gender: event.gender
                      })
                    )

                    // Guardar datos en el store del usuario
                    this.$store.commit('user/setState', { key: 'birthdate', value: birthdate })
                    this.$store.commit('user/setState', { key: 'gender', value: event.gender })

                    // Enviar a Home
                    this.$router.push(process.env.routes.home.path)
                  } catch (e) {
                    console.log(e)
                  }
                }
              }
            } else {
              console.log('Debe ingresar todos los datos!')
            }
          } catch (e) {
            console.log(e)
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
