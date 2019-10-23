// LIBRERIAS
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser, getUsers } from '@/graphql/queries'

// EXPORT
export default ({ route, store, redirect }) => {
  // Ruta actual
  const currentPath = route.name

  // Obtener sesion actual
  Auth.currentSession()

    // Sesion iniciada
    .then(function (data) {
      // Si se encuentra en Star enviar a Home
      if (currentPath === process.env.routes.start.name) {
        // Usar API de Arzov
        API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

        // Obtener datos del usuario
        API.graphql(graphqlOperation(getUser, { hashKey: data.idToken.payload.email }))
          .then((result) => {
            // Guardar datos del usuario en el store
            store.commit('user/setState', { key: 'id', value: result.data.getUser.hashKey })
            store.commit('user/setState', { key: 'firstName', value: result.data.getUser.firstName })
            store.commit('user/setState', { key: 'lastName', value: result.data.getUser.lastName })
            store.commit('user/setState', { key: 'birthdate', value: result.data.getUser.birthdate })
            store.commit('user/setState', { key: 'gender', value: result.data.getUser.gender })
            store.commit('user/setState', { key: 'picture', value: result.data.getUser.picture })

            // Usar API de Umatch
            API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

            // Obtener datos Umatch del usuario
            API.graphql(graphqlOperation(getUsers, { rangeKey: store.state.user.id }))
              .then(function (result) {
                // Guardar filtros si existen desde DynamoDB
                if (result.data.getUsers.items.length) {
                  store.commit('user/setState', { key: 'matchFilter', value: result.data.getUsers.items[0].matchFilter.S })
                  store.commit('user/setState', { key: 'genderFilter', value: result.data.getUsers.items[0].genderFilter.S })
                  store.commit('user/setState', { key: 'ageFilter', value: result.data.getUsers.items[0].ageFilter.NS })
                }

                // Redireccionar a Home
                redirect(process.env.routes.home.path)
              })
              // eslint-disable-next-line no-console
              .catch(e => console.log(e))
          })
          // eslint-disable-next-line no-console
          .catch(e => console.log(e))

      // Esta dentro de la app
      } else {
        /**
         * Revisar atributos obligatorios (fecha de nacimiento y sexo)
         */

        // No existen atributos
        if (store.state.user.birthdate === ' ') {
          // Si no esta en la vista RequiredAttr entonces redireccionar
          if (currentPath !== process.env.routes.required_attr.name) {
            redirect(process.env.routes.required_attr.path)
          }

        // Los atributos existen y esta en RequiredAttr entonces ir a Home
        } else if (currentPath === process.env.routes.required_attr.name) {
          redirect(process.env.routes.home.path)
        }

        /**
         * Revisar filtros obligatorios (tramo de edad, tipo de match y sexo)
         */

        // No existen filtros
        if (!store.state.user.matchFilter) {
          // Reenviar a RequiredFilters siempre y cuando no se este en la vista de filtros o atributos
          if (currentPath !== process.env.routes.required_filters.name && currentPath !== process.env.routes.required_attr.name) {
            redirect(process.env.routes.required_filters.path)
          }

        // Los filtros existen y esta en RequiredFilters entonces ir a Home
        } else if (currentPath === process.env.routes.required_filters.name) {
          redirect(process.env.routes.home.path)
        }
      }
    })

    // No hay sesion
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.log(err)

      // Si se encuentra en la app entonces enviar a Start
      if (currentPath !== process.env.routes.start.name) {
        redirect(process.env.routes.start.path)
      }
    })
}
