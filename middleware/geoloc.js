// LIBRERIAS
import { API } from 'aws-amplify'

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

        // Actualizar ubicacion solo si esta en la vista Home
        if (currentPath === process.env.routes.home.name) {
          const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
          const path = process.env.aws.LAMBDA_ARV_UMT_PUT_GEOLOCATION
          const params = {
            body: {
              userId: store.state.user.id,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              genderFilter: store.state.user.genderFilter,
              matchFilter: store.state.user.matchFilter,
              ageFilter: store.state.user.ageFilter
            }
          }

          // Llamada a Lambda para agregar posicion del usuario
          API.post(apiName, path, params).then((response) => {
            store.commit('user/setState', { key: 'latitude', value: position.coords.latitude })
            store.commit('user/setState', { key: 'longitude', value: position.coords.longitude })
            store.commit('user/setState', { key: 'geohash', value: response.data.Items[0].hashKey.N })
            store.commit('user/setState', { key: 'genderFilter', value: response.data.Items[0].genderFilter.S })
            store.commit('user/setState', { key: 'matchFilter', value: response.data.Items[0].matchFilter.S })
            store.commit('user/setState', { key: 'ageFilter', value: response.data.Items[0].ageFilter.NS })

          // eslint-disable-next-line no-console
          }).catch(e => console.log(e))
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
