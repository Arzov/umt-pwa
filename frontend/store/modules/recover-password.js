const actions = {
  /**
   * Restablece la contraseña.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Datos para restablecer la contraseña _email_.
   */
  recoverPassword (ctx, data) {
    this.$AWS.Auth.forgotPassword(data.email)
      .then(() => {
        const params = {
          email: data.email
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
  }
}

export default {
  namespaced: true,
  actions
}
