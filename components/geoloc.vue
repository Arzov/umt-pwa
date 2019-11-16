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
export default {
  name: 'Geolocation',
  methods: {
    getPosition () {
      const vue = this

      // Obtener ubicacion del usuario
      navigator.geolocation.getCurrentPosition(function (position) {
        // Parametros para graphql
        const userData = vue.$store.getters['user/userData']

        const params = {
          userId: userData.id,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          genderFilter: userData.genderFilter,
          matchFilter: userData.matchFilter,
          ageMinFilter: userData.ageMinFilter,
          ageMaxFilter: userData.ageMaxFilter,
          isSavePosition: true
        }

        vue.$store.dispatch('user/updatePosition', params)

      // Error en la peticion de la ubicacion
      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Parametros para dispatch
            const params = {
              toggle: true,
              allow: false
            }

            // Mostrar popup para que el usuario configure la ubicacion
            vue.$store.dispatch('geoloc/update', params)
            break

          default:
            console.log('Error desconocido.')
            break
        }
      })
    },
    resetStates () {
      this.$store.dispatch('geoloc/resetStates')
    },
    logout () {
      this.$AWS.Auth.signOut({ global: true })
    }
  }
}
</script>

<style scoped>

</style>
