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
  try {
    const result = await API.graphql(graphqlOperation(query, {
      hashKey: data.idToken.payload.email
    }))

    // Guardar datos del usuario en el store
    store.commit('user/setState', { key: 'id', value: result.data.getUser.hashKey })
    store.commit('user/setState', { key: 'firstName', value: result.data.getUser.firstName })
    store.commit('user/setState', { key: 'lastName', value: result.data.getUser.lastName })
    store.commit('user/setState', { key: 'birthdate', value: result.data.getUser.birthdate })
    store.commit('user/setState', { key: 'gender', value: result.data.getUser.gender })
    store.commit('user/setState', { key: 'picture', value: result.data.getUser.picture })

    // Reiniciar endpoint de la API Umatch
    // API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    // Si la fecha de nacimiento existe entonces redireccionar a Home
    if (result.data.getUser.birthdate !== ' ') {
      console.log('hola1')
      redirect(process.env.routes.home.path)

    // Si no entonces redireccionar a RequiredAttr
    } else {
      console.log('hola2')
      redirect(process.env.routes.required_attr.path)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

// EXPORT
export default ({ route, store, redirect }) => {
  // Usar API de Arzov
  API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

  // Ruta actual
  const currentPath = route.name

  // Obtener sesion actual
  Auth.currentSession()
    // Sesion iniciada
    .then(function (data) {
      // Si se encuentra en la vista Star enviar a la vista Home
      if (currentPath === process.env.routes.start.name) {
        setUser(getUser, data, store, redirect)

      // Revisar que atributos y filtros requeridos esten completos
      } else if (store.state.user.birthdate === ' ') {
        console.log('hola3')
        if (currentPath !== process.env.routes.required_attr.name) {
          redirect(process.env.routes.required_attr.path)
        }
      } else if (currentPath === process.env.routes.required_attr.name) {
        console.log('hola4')
        redirect(process.env.routes.home.path)
      }
    })

    // No hay sesion
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log(err)

      // Si se encuentra en la app entonces enviar a la vista Start
      if (currentPath !== process.env.routes.start.name) {
        redirect(process.env.routes.start.path)
      }
    })
}
