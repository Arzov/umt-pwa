import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getUser } from '@/graphql/queries'

// Funcion para obtener datos del usuario
async function setUser (query, data, store) {
  API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

  try {
    const result = await API.graphql(graphqlOperation(query, {
      hashKey: data.username.includes('@') ? data.username : data.attributes.email
    }))

    store.commit('updateUser', { key: 'userId', value: result.data.getUser.hashKey })
    store.commit('updateUser', { key: 'userFirstName', value: result.data.getUser.firstName })
    store.commit('updateUser', { key: 'userLastName', value: result.data.getUser.lastName })
    store.commit('updateUser', { key: 'userPicture', value: result.data.getUser.picture })
  } catch (e) {
    console.log(e)
  }
}

export default ({ route, store, redirect }) => {
  let signedIn = false
  const isInStart = (function (path) {
    switch (path) {
      case process.env.routes.start.name:
        return true
      default:
        return false
    }
  })(route.name)

  Auth.currentUserInfo()
    .then(function (data) {
      signedIn = Boolean(data)
      return data
    })
    .then(function (data) {
      if (signedIn) {
        if (isInStart) {
          console.log('entrar')
          setUser(getUser, data, store)
          // Resetear al enpoint de la API de Umatch
          API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL
          redirect(process.env.routes.home.path)
        }
      } else if (!isInStart) {
        console.log('salir')
        redirect(process.env.routes.start.path)
      }

      console.log('quedarse')
    })
}
