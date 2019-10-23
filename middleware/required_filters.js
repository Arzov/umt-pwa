// LIBRERIAS
import { API, graphqlOperation } from 'aws-amplify'
import { getUsers } from '@/graphql/queries'

// EXPORT
export default ({ route, store, redirect }) => {
  // Ruta actual
  const currentPath = route.name

  // Si se encuentra dentro de la app revisar los filtros requeridos
  if (currentPath !== process.env.routes.start.name) {
    // Usar API de Umatch
    API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

    try {
      // Obtener datos del usuario
      API.graphql(graphqlOperation(getUsers, {
        rangeKey: store.state.user.id
      }))
        .then(function (result) {
          // Llenar filtros si existen desde DynamoDB
          if (result.data.getUsers.items.length) {
            store.commit('user/setState', { key: 'matchFilter', value: result.data.getUsers.items[0].matchFilter.S })
            store.commit('user/setState', { key: 'genderFilter', value: result.data.getUsers.items[0].genderFilter.S })
            store.commit('user/setState', { key: 'ageFilter', value: result.data.getUsers.items[0].ageFilter.NS })
          }

          // Faltan filtros
          if (!store.state.user.matchFilter && !result.data.getUsers.items.length) {
            // Reenviar a filtros requeridos siempre y cuando no se este en la vista de filtros o atributos
            if (currentPath !== process.env.routes.required_filters.name && currentPath !== process.env.routes.required_attr.name) {
              redirect(process.env.routes.required_filters.path)
            }

          // Filtros completos entonces ir al Home
          } else if (currentPath === process.env.routes.required_filters.name) {
            redirect(process.env.routes.home.path)
          }
        })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
