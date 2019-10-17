import { Auth } from 'aws-amplify'

export default async ({ app }) => {
  let signedIn = false

  await Auth.currentUserInfo()
    .then(data => (signedIn = Boolean(data)))
    .then(function () {
      const isInStart = (function (path) {
        switch (path) {
          case 'start':
            return true
          default:
            return false
        }
      })(app.router.app.$route.name)

      if (signedIn) {
        if (isInStart) { console.log('entrar') } // window.location.replace('/chat')
      } else if (!isInStart) { console.log('salir') } // window.location.replace('/start')
    })
}
