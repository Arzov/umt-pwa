const state = () => ({
})

const mutations = {
}

const actions = {
  recoverPassword (ctx, data) {
    console.log(data)
    if (data.username) {
      this.$AWS.Auth.forgotPassword(data)
      .then((user) => {
        // eslint-disable-next-line no-console
        console.log(user)

        // eslint-disable-next-line no-unused-expressions
        // this.$router.push(process.env.routes.home.path)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)

        switch (err.code) {
          // Usuario invalido
          case 'SerializationException':
              console.log(err.message)
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
