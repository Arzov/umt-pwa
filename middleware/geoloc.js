// LIBRERIAS
import { API } from 'aws-amplify'

// FUNCIONES
function positionError (error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('El usuario denego el permiso ubicacion.')
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
}

// EXPORT
export default ({ route, store, redirect }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    // Obtener ubicacion del usuario
    navigator.geolocation.getCurrentPosition(function (position) {
      const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
      const path = process.env.aws.LAMBDA_ARV_UMT_PUT_GEOLOCATION
      const params = {
        body: {
          hashKey: store.state.userGeoHash,
          userId: store.state.userId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      }

      // Llamada a Lambda para agregar posicion del usuario
      API.post(apiName, path, params).then((response) => {
        console.log(response)
        store.commit('updateState', { key: 'userLatitude', value: position.coords.latitude })
        store.commit('updateState', { key: 'userLongitude', value: position.coords.longitude })
      }).catch((error) => {
        console.log(error)
      })
    }, positionError)

  // El dispositivo no soporta la geolocalizacion
  } else {
    // Deberia desplegarse el popup de que no es posible usar la app
    console.log('La geolocalozacion no esta disponible!')
  }
}
