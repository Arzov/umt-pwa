<template>
  <div v-if="this.$store.state.geoloc.toggle">
    <a-row v-if="this.$store.state.geoloc.allow">
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
        const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
        const path = process.env.aws.LAMBDA_ARV_UMT_PUT_GEOLOCATION
        const params = {
          body: {
            userId: vue.$store.state.user.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            genderFilter: vue.$store.state.user.genderFilter,
            matchFilter: vue.$store.state.user.matchFilter,
            ageFilter: vue.$store.state.user.ageFilter
          }
        }

        // Llamada a Lambda para agregar posicion del usuario
        vue.$Amplify.API.post(apiName, path, params).then((response) => {
          vue.$store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
          vue.$store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
          vue.$store.commit('user/setState', { key: 'geohash', value: response.data.Items[0].hashKey.N })
          vue.$store.commit('user/setState', { key: 'genderFilter', value: response.data.Items[0].genderFilter.S })
          vue.$store.commit('user/setState', { key: 'matchFilter', value: response.data.Items[0].matchFilter.S })
          vue.$store.commit('user/setState', { key: 'ageFilter', value: response.data.Items[0].ageFilter.NS })
          vue.$store.commit('user/setState', { key: 'allowGeoloc', value: true })

          // Si habilito el permiso de ubicacion entonces quitar popup
          vue.$store.commit('geoloc/setState', { key: 'toggle', value: false })
        }).catch((error) => {
          console.log(error)
        })
        // }

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
