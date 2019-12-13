const state = () => ({
})

const mutations = {
}

const actions = {
  resetPassword (ctx, data) {
    console.log(data)
    if (data.code && data.password) {
      if (data.password.length >= 6) {
        this.$AWS.Auth.forgotPasswordSubmit(
          ctx.rootState.user.id,
          data.code,
          data.password
        )
          .then((result) => {
            const params = {
              id: null
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
      } else {
        console.log('Contraseña debe tener al menos 6 caracteres!')
      }
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
