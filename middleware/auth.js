// LIBRERIAS
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser } from '@/graphql/queries'

// FUNCIONES
/**
 * Funcion para obtener datos del usuario una vez autenticado
 * @param {String}  query    Query graphql para obtener usuario.
 * @param {Object}  data     Datos de la sesion del usuario.
 * @param {Object}  store    Store de nuxt para almacenar los estados del usuario.
 * @param {Object}  redirect Objeto de redireccionamiento de paginas.
 */
async function setUser (query, data, store, redirect) {
  // Usar API de Arzov
  API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

  try {
    const result = await API.graphql(graphqlOperation(query, {
      hashKey: data.idToken.payload.email
    }))

    // Guardar datos del usuario en el store
    store.commit('user/setState', { key: 'id', value: result.data.getUser.hashKey })
    store.commit('user/setState', { key: 'firstName', value: result.data.getUser.firstName })
    store.commit('user/setState', { key: 'lastName', value: result.data.getUser.lastName })
    store.commit('user/setState', { key: 'picture', value: result.data.getUser.picture })

    // Reiniciar endpoint de la API Umatch
    API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL
    redirect(process.env.routes.home.path)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

// EXPORT
export default ({ route, store, redirect }) => {
  const isInStart = (function (path) {
    switch (path) {
      case process.env.routes.start.name:
        return true
      default:
        return false
    }
  })(route.name) // Indica si el usuario se encuentra en la vista Start

  // Obtener sesion actual
  Auth.currentSession()
    // Sesion iniciada
    .then(function (data) {
      // Si se encuentra en la vista Star enviar a la vista Home
      if (isInStart) {
        // Obtener datos del usuario, luego reiniciar la API al endpoint de Umatch
        setUser(getUser, data, store, redirect)
      }
    })

    // No hay sesion y se encuentra en la app enviar a la vista Start
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log(err)

      if (!isInStart) {
        redirect(process.env.routes.start.path)
      }
    })
}
