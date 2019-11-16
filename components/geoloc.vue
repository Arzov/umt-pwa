<template>
  <div v-if="this.$store.getters['geoloc/toggle']">
    <a-row v-if="this.$store.getters['geoloc/allow']">
      <h1><b>Comparte tu ubicación</b></h1>
      Umatch utiliza tu ubicación para encontrar rivales cercanos. Presiona el botón "Aceptar" y luego debes permitir el acceso a la ubicación, de lo contrario no podrás usar la aplicación.
      <a-button @click="getPosition">
        Aceptar
      </a-button>
      <a-button @click="logout">
        Cerrar sesión
      </a-button>
    </a-row>
    <a-row v-else>
      <h1><b>¡Ubicación denegada!</b></h1>
      Necesitas habilitar la ubicación para utilizar la aplicación. Debes configurar tu navegador.
      <a-button>
        Configurar
      </a-button>
      <a-button @click="resetStates">
        Atrás
      </a-button>
    </a-row>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { addUserLocation } from '@/graphql/mutations'

// Usar API de Umatch
API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

export default {
  name: 'Geolocation',
  methods: {
    getPosition () {
      const vue = this

      // Obtener ubicacion del usuario
      navigator.geolocation.getCurrentPosition(function (position) {
        // Parametros para graphql
        const userData = vue.$store.getters['user/userInfoGraphAPI']

        const params = {
          userId: userData.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          genderFilter: userData.genderFilter,
          matchFilter: userData.matchFilter,
          ageMinFilter: vue.$store.state.user.ageMinFilter,
          ageMaxFilter: vue.$store.state.user.ageMaxFilter
        }

        // Agregar posicion del usuario
        API.graphql(graphqlOperation(addUserLocation, params))
          .then((response) => {
            vue.$store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
            vue.$store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
            vue.$store.commit('user/setState', { key: 'geohash', value: response.data.addUserLocation.hashKey })
            vue.$store.commit('user/setState', { key: 'allowGeoloc', value: true })

            // Ocultar popup
            vue.$store.commit('geoloc/setState', { key: 'toggle', value: false })
          })
          // eslint-disable-next-line no-console
          .catch(e => console.log(e))

      // Error en la peticion de la ubicacion
      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Mostrar popup para que el usuario configure la ubicacion
            vue.$store.commit('geoloc/setState', { key: 'toggle', value: true })
            vue.$store.commit('geoloc/setState', { key: 'allow', value: false })
            vue.$store.commit('user/setState', { key: 'allowGeoloc', value: false })
            break

          default:
            console.log('Error desconocido.')
            break
        }
      })
    },
    resetStates () {
      this.$store.commit('geoloc/resetStates')
    },
    logout () {
      this.$Amplify.Auth.signOut({ global: true })
    }
  }
}
</script>

<style scoped>

</style>
