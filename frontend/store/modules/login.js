const actions = {
  /**
   * Inicia sesión con la autenticación de AWS Cognito.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Datos de autenticación _email_ y _password_.
   */
  signIn (ctx, data) {
    // Autenticación con AWS Cognito
    // TODO: Inyectar componente _popup_ para mostrar mensajes
    this.$AWS.Auth.signIn({
      username: data.email.toLowerCase(),
      password: data.password
    })
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
  }
}

export default {
    namespaced: true,
    actions
}
