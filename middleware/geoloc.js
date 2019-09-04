// LIBRERIAS
import { API } from 'aws-amplify'

// EXPORT
export default ({ route, store, redirect }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    // Obtener ubicacion del usuario
    navigator.geolocation.getCurrentPosition(function (position) {
      // Si habilito el permiso de ubicacion entonces quitar popup
      store.commit('popUp/updateState', { key: 'togglePopUp', value: false })

      const isInHome = (function (path) {
        switch (path) {
          case process.env.routes.home.name:
            return true
          default:
            return false
        }
      })(route.name) // Indica si el usuario se encuentra en la vista Home o no

      // Actualizar ubicacion solo si esta en la vista Home
      if (isInHome) {
        const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
        const path = process.env.aws.LAMBDA_ARV_UMT_PUT_GEOLOCATION
        const params = {
          body: {
            userId: store.state.user.userId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }

        // Llamada a Lambda para agregar posicion del usuario
        API.post(apiName, path, params).then((response) => {
          store.commit('user/updateState', { key: 'userLatitude', value: position.coords.latitude })
          store.commit('user/updateState', { key: 'userLongitude', value: position.coords.longitude })
          store.commit('user/updateState', { key: 'userGeohash', value: response.data.Items[0].hashKey.N })
        }).catch((error) => {
          console.log(error)
        })
      }
    }, function (error) { // Error en la peticion de la ubicacion
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // Mostrar PopUp para que el usuario configure la ubicacion
          console.error('El usuario denego el permiso ubicacion.')
          store.commit('popUp/updateState', { key: 'togglePopUp', value: true })
          break
        case error.POSITION_UNAVAILABLE:
          console.error('Ubicacion no disponible.')
          break
        case error.TIMEOUT:
          console.error('Termino de tiempo en requerimiento de ubicacion.')
          break
        case error.UNKNOWN_ERROR:
          console.error('Error desconocido.')
          break
      }
    })

  // El dispositivo no soporta la geolocalizacion
  } else {
    // Deberia desplegarse el popup de que no es posible usar la app
    console.log('La geolocalozacion no esta disponible!')
  }
}
