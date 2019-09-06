// LIBRERIAS
import { API } from 'aws-amplify'

// EXPORT
export default ({ route, store, redirect }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    // Si el usuario acepto el permiso de la geolocalizacion entonces se debe
    // actualizar la posicion siempre y cuando el usuario se encuentre en la
    // vista Home
    if (store.state.user.allowGeoloc) {
      // Obtener ubicacion del usuario
      navigator.geolocation.getCurrentPosition(function (position) {
        const isInHome = (function (path) {
          switch (path) {
            case process.env.routes.home.name:
              return true
            default:
              return false
          }
        })(route.name) // Indica si el usuario se encuentra en la vista Home

        // Actualizar ubicacion solo si esta en la vista Home
        if (isInHome) {
          const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
          const path = process.env.aws.LAMBDA_ARV_UMT_PUT_GEOLOCATION
          const params = {
            body: {
              userId: store.state.user.id,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }

          // Llamada a Lambda para agregar posicion del usuario
          API.post(apiName, path, params).then((response) => {
            store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
            store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
            store.commit('user/setState', { key: 'geohash', value: response.data.Items[0].hashKey.N })
            store.commit('user/setState', { key: 'inMatch', value: response.data.Items[0].inMatch.BOOL })
            store.commit('user/setState', { key: 'matchType', value: response.data.Items[0].matchType.S })
          }).catch((error) => {
            console.log(error)
          })
        }

      // Error en la peticion de la ubicacion
      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Mostrar PopUp para que el usuario configure la ubicacion
            store.commit('geoloc/setState', { key: 'toggle', value: true })
            store.commit('geoloc/setState', { key: 'message', value: 'Ups denego el permiso' })
            store.commit('geoloc/setState', { key: 'allowBtn', value: false })
            store.commit('geoloc/setState', { key: 'resetBtn', value: true })
            store.commit('user/setState', { key: 'allowGeoloc', value: false })
            break
          default:
            console.log('Error desconocido.')
            break
        }
      })
    }

  // El dispositivo no soporta la geolocalizacion
  } else {
    // Deberia desplegarse el popup de que no es posible usar la app
    console.log('La geolocalozacion no esta disponible!')
  }
}
