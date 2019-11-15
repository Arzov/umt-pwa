// LIBRERIAS
import { API, graphqlOperation } from 'aws-amplify'
import { addUserLocation } from '@/graphql/mutations'

// FUNCIONES
function getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const p = Math.PI / 180
  const dLat = (lat2 - lat1) * p
  const dLon = (lon2 - lon1) * p
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * p) * Math.cos(lat2 * p) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

// EXPORT
export default ({ store }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    // El usuario acepto el permiso de geolocalizacion
    if (store.state.user.allowGeoloc) {
      // Actualizar la ubicacion si el usuario se mueve mas de 10km
      navigator.geolocation.getCurrentPosition(function (position) {
        // Distancia desplazada
        const moveDistance = getDistanceFromLatLonInKm(
          position.coords.latitude,
          position.coords.longitude,
          store.state.user.latitude,
          store.state.user.longitude
        )

        if (moveDistance >= 10) {
          // Usar API de Umatch
          API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

          // Parametros para graphql
          const params = {
            userId: store.state.user.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            genderFilter: store.state.user.genderFilter,
            matchFilter: store.state.user.matchFilter,
            ageMinFilter: store.state.user.ageMinFilter,
            ageMaxFilter: store.state.user.ageMaxFilter
          }

          // Agregar posicion del usuario
          API.graphql(graphqlOperation(addUserLocation, params))
            .then((response) => {
              store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
              store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
              store.commit('user/setState', { key: 'geohash', value: response.data.addUserLocation.hashKey })
            })
            // eslint-disable-next-line no-console
            .catch(e => console.log(e))
        }

      // Error en la peticion de la ubicacion
      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Mostrar popup para que el usuario configure la ubicacion
            store.commit('geoloc/setState', { key: 'toggle', value: true })
            store.commit('geoloc/setState', { key: 'allow', value: false })
            store.commit('user/setState', { key: 'allowGeoloc', value: false })
            break

          default:
            // eslint-disable-next-line no-console
            console.log('¡Error desconocido!')
            break
        }
      })
    }

  // El dispositivo no soporta la geolocalizacion
  } else {
    // Deberia desplegarse el popup de que no es posible usar la app
    // eslint-disable-next-line no-console
    console.log('La geolocalozacion no esta disponible en el dispositivo!')
  }
}
