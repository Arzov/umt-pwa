const state = () => ({
})

const mutations = {
}

const actions = {
  recoverPassword (ctx, data) {
    if (data.username) {
      this.$AWS.Auth.forgotPassword(data.username)
      .then((user) => {
        // eslint-disable-next-line no-console
        console.log(user)

        const params = {
          id: data.username
        }

        ctx.commit('user/setState', { params }, { root: true })

        // eslint-disable-next-line no-unused-expressions
        this.$router.push(process.env.routes.reset_password.path)
      })
      .catch((err) => {
        switch (err.code) {
          // Usuario invalido
          case 'UserNotFoundException':
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
