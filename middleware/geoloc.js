// import { Auth, API, graphqlOperation } from 'aws-amplify'

function positionError (error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error('User denied the request for Geolocation.')
      break
    case error.POSITION_UNAVAILABLE:
      console.error('Location information is unavailable.')
      break
    case error.TIMEOUT:
      console.error('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      console.error('An unknown error occurred.')
      break
  }
}

export default ({ route, store, redirect }) => {
  // Validar si dispositivo soporta geolocalizacion
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      store.commit('updateUser', { key: 'userLatitude', value: position.coords.latitude })
      store.commit('updateUser', { key: 'userLongitude', value: position.coords.longitude })
    }, positionError)
  } else {
    console.log('La geolocalozacion no esta disponible!')
    // Deberia desplegarse el popup de activar la posicion
  }
}
