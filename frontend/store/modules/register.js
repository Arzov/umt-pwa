const actions = {
    signUp (ctx, data) {
        // TODO: Completar lógica para _spin_

        const birthdate = String(data.birthdate.year) + '-' + data.birthdate.month + '-' + data.birthdate.day

        // Registrar mediante AWS Cognito
        // TODO: Inyectar componente _popup_ para mostrar mensajes
        this.$AWS.Auth.signUp({
            username: data.email.toLowerCase(),
            password: data.password,
            attributes: {
                email: data.email,
                name: data.name,
                birthdate,
                gender: data.gender
            }
        })
            .then((result) => {
                const params = {
                    name: data.name,
                    birthdate,
                    gender: data.gender,
                    email: data.email.toLowerCase(),
                    verified: false
                }
    
                // Guardar estados para usuario
                ctx.commit('user/setState', { params }, { root: true })

                // Enviar a verificar email
                this.$router.push(process.env.routes.email_verification.path)
            })
            .catch((err) => {
                switch (err.code) {
                    // Problema con trigger lambda PreSignUp
                    case 'UserLambdaValidationException':
                        console.log(err.message.split('#')[1])
                        break
                    
                    // Usuario ya existe
                    case 'UsernameExistsException':
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
