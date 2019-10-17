<template>
  <div v-if="this.$store.state.geoloc.toggle">
    {{ this.$store.state.geoloc.message }}
    <a-button v-if="this.$store.state.geoloc.allowBtn" @click="getPosition">
      Aceptar
    </a-button>
    <a-button v-if="this.$store.state.geoloc.resetBtn" @click="resetStates">
      Aceptar
    </a-button>
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
            longitude: position.coords.longitude
          }
        }

        // Llamada a Lambda para agregar posicion del usuario
        vue.$Amplify.API.post(apiName, path, params).then((response) => {
          vue.$store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
          vue.$store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
          vue.$store.commit('user/setState', { key: 'geohash', value: response.data.Items[0].hashKey.N })
          vue.$store.commit('user/setState', { key: 'inMatch', value: response.data.Items[0].inMatch.BOOL })
          vue.$store.commit('user/setState', { key: 'matchType', value: response.data.Items[0].matchType.S })
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
            // Mostrar PopUp para que el usuario configure la ubicacion
            vue.$store.commit('geoloc/setState', { key: 'toggle', value: true })
            vue.$store.commit('geoloc/setState', { key: 'message', value: 'Ups denego el permiso' })
            vue.$store.commit('geoloc/setState', { key: 'allowBtn', value: false })
            vue.$store.commit('geoloc/setState', { key: 'resetBtn', value: true })
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
    }
  }
}
</script>

<style scoped>

</style>
