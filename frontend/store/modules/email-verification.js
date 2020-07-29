const actions = {
    verify (ctx, data) {
        // Verificar codigo
        // TODO: Inyectar componente _popup_ para mostrar mensajes
        this.$AWS.Auth.confirmSignUp(
            ctx.rootState.user.email,
            data.code,
            {
                forceAliasCreation: true
            }
        )
            .then((data) => {
                const params = {
                    verified: true
                }

                // Guardar estados para usuario
                ctx.commit('user/setState', { params }, { root: true })

                // Enviar a iniciar sesion
                this.$router.push(process.env.routes.login.path)
            })
            .catch((err) => {
                switch (err.code) {
                    // Codigo invalido
                    case 'CodeMismatchException':
                        console.log(err.message)
                        break
                    
                    // Caracter invalido ingresado
                    case 'InvalidParameterException':
                        console.log(err.message)
                        break
                    
                    // Error desconocido
                    default:
                        console.log('¡Error desconocido!')
                        break
                }
            })
    },
    resendCode (ctx) {
        // Reenviar codigo
        this.$AWS.Auth.resendSignUp(
            ctx.rootState.user.email
        )
            .then((data) => {
                // TODO: Implementar popup
                console.log('Codigo enviado a ' + ctx.rootState.user.email + '!')
            })
            .catch((err) => {
                console.log(err)
            })
    }
  }
  
  export default {
      namespaced: true,
      actions
  }
