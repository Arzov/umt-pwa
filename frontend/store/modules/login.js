const actions = {
  /**
   * Inicia sesión con la autenticación de AWS Cognito.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Datos de autenticación _email_ y _password_.
   */
  signIn (ctx, data) {
    // TODO: Completar lógica para _spin_
    ctx.dispatch('setSpin', true, { root: true })

    // Parámetros _email_ y _password_ deben ser no nulos
    // TODO: Inyectar componente _popup_ para mostrar mensajes
    if (data.email && data.password) {
      // Parametro _username_ es necesario para AWS Cognito
      data.username = data.email

      // Autenticación con AWS Cognito
      this.$AWS.Auth.signIn(data)
      .then((user) => {
        this.$router.push(process.env.routes.home.path)
      })
      .catch((err) => {
        switch (err.code) {
          // Email inválido
          case 'UserNotFoundException':
              console.log(err.message)
              break
          
          // Contraseña incorrecta
          case 'NotAuthorizedException':
              console.log(err.message)
              break

          // Email sin verificar
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
      console.log('¡Debe ingresar todos los datos!')
    }
  }
}

export default {
    namespaced: true,
    actions
}
