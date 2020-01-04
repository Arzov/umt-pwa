const state = () => ({
})

const mutations = {
}

const actions = {
  signIn (context, data) {
    if (data.username && data.password) {
      this.$AWS.Auth.signIn(data)
      .then((user) => {
        // eslint-disable-next-line no-console
        console.log(user)

        // eslint-disable-next-line no-unused-expressions
        this.$router.push(process.env.routes.home.path)
      })
      .catch((err) => {
        switch (err.code) {
          // Usuario invalido
          case 'UserNotFoundException':
              console.log(err.message)
              break
          
          // Password incorrecta
          case 'NotAuthorizedException':
              console.log(err.message)
              break

          // Usuario sin verificar
          case 'UserNotConfirmedException':
              console.log(err.message)
              this.$router.push(process.env.routes.verification.path)
              break
          
          // Error desconocido
          default:
              console.log('¡Error desconocido!')
              break
        }
      })
    } else {
      console.log('Debe ingresar todos los datos!')
    }
  }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
