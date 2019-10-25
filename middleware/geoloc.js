// LIBRERIAS
import { API, graphqlOperation } from 'aws-amplify'
import { addUserLocation } from '@/graphql/mutations'

// EXPORT
export default ({ route, store, redirect }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    // El usuario acepto el permiso de geolocalizacion
    if (store.state.user.allowGeoloc) {
      // Actualizar la ubicacion cada vez que entra al Home
      navigator.geolocation.getCurrentPosition(function (position) {
        // Ruta actual
        const currentPath = route.name

        if (currentPath === process.env.routes.home.name) {
          // Usar API de Umatch
          API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

          // Parametros para graphql
          const params = {
            userId: store.state.user.id,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            genderFilter: store.state.user.genderFilter,
            matchFilter: store.state.user.matchFilter,
            ageFilter: store.state.user.ageFilter
          }

          // Agregar posicion del usuario
          API.graphql(graphqlOperation(addUserLocation, params))
            .then((response) => {
              store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
              store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
              store.commit('user/setState', { key: 'geohash', value: response.hashKey })
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
