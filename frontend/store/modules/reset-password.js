const actions = {
  /**
   * Cambia contraseña actual.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Datos para cambiar contraseña _code_ y _password_.
   */
  resetPassword (ctx, data) {
    this.$AWS.Auth.forgotPasswordSubmit(
      ctx.rootState.user.email,
      data.code,
      data.password
    )
      .then((result) => {
        const params = {
          email: null
        }
    
        ctx.commit('user/setState', { params }, { root: true })

        // eslint-disable-next-line no-unused-expressions
        this.$router.push(process.env.routes.login.path)
      })
      .catch((err) => {
        switch (err.code) {
          // Codigo invalido
          case 'CodeMismatchException':
            console.log(err.message)
            break
              
          // Codigo expirado
          case 'ExpiredCodeException':
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
