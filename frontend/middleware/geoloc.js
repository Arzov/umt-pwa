import { getDistance } from '@/utils/geolocUtils'

export default ({ store }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    // Datos del usuario
    const userData = store.getters['user/userData']

    // El usuario acepto el permiso de geolocalizacion
    if (!store.getters['geoloc/toggle']) {
      // Actualizar la ubicacion si el usuario se mueve mas de 5km
      navigator.geolocation.getCurrentPosition(function (position) {
        // Distancia desplazada
        const moveDistance = getDistance(
          position.coords.latitude,
          position.coords.longitude,
          userData.latitude,
          userData.longitude
        )

        if (moveDistance >= 5) {
          // Parametros para graphql
          const params = {
            rangeKey: userData.email,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            genderFilter: userData.genderFilter,
            matchFilter: userData.matchFilter,
            ageMinFilter: userData.ageMinFilter,
            ageMaxFilter: userData.ageMaxFilter,
            isSavePosition: false
          }

          store.dispatch('user/updatePosition', params)
        }

      // Error en la peticion de la ubicacion
      }, function (error) {
        // Parametros para dispatch
        const params = {
          toggle: true,
          allow: false
        }

        switch (error.code) {
          case error.PERMISSION_DENIED:
            // Mostrar popup para que el usuario configure la ubicacion
            store.dispatch('geoloc/update', params)
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
