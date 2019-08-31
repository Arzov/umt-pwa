// LIBRERIAS
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser } from '@/graphql/queries'

// FUNCIONES
/**
 * Funcion para obtener datos del usuario una vez autenticado
 */
async function setUser (query, data, store) {
  // Usar API de Arzov
  API.configure({
    aws_appsync_graphqlEndpoint: process.env.aws.APPSYNC_ARZOV_URL
  })

  try {
    const result = await API.graphql(graphqlOperation(query, {
      hashKey: data.username.includes('@') ? data.username : data.attributes.email
    }))

    // Guardar datos del usuario en el store
    store.commit('updateState', { key: 'userId', value: result.data.getUser.hashKey })
    store.commit('updateState', { key: 'userFirstName', value: result.data.getUser.firstName })
    store.commit('updateState', { key: 'userLastName', value: result.data.getUser.lastName })
    store.commit('updateState', { key: 'userPicture', value: result.data.getUser.picture })
  } catch (e) {
    console.log(e)
  }
}

// EXPORT
export default ({ route, store, redirect }) => {
  let signedIn = false // Indica si el usuario se encuentra autenticado o no
  const isInStart = (function (path) {
    switch (path) {
      case process.env.routes.start.name:
        return true
      default:
        return false
    }
  })(route.name) // Indica si el usuario se encuentra en la vista Start o no

  // Obtener sesion actual
  Auth.currentUserInfo()
    .then(function (data) {
      signedIn = Boolean(data) // Retorna la sesion
      return data
    })
    .then(function (data) {
      // Si la sesion esta iniciada y se encuentra en la vista Star enviar
      // a la vista Home
      if (signedIn && isInStart) {
        // Obtener datos del usuario, luego resetear la API al endpoint
        // de Umatch
        console.log('entrar')
        setUser(getUser, data, store)
        // redirect(process.env.routes.home.path)

      // Si no esta iniciada  y se encuentra en la app enviar a la vista Start
      } else if (!isInStart) {
        console.log('salir')
        // redirect(process.env.routes.start.path)
      }

      // El usuario se encuentra en la vista correcta independiente del estado
      // de la sesion
      console.log('quedarse')
      API.configure({
        aws_appsync_graphqlEndpoint: process.env.aws.APPSYNC_UMATCH_URL
      })
    })
}
