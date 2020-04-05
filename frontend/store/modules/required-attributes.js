import { updateUser } from '@/graphql/mutations'

const actions = {
  saveAttributes (ctx, data) {
    const birthdate = String(data.birthdate.year) + '-' + data.birthdate.month + '-' + data.birthdate.day

    // Usar API de Arzov
    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

    // Actualizar datos del usuario
    this.$AWS.API.graphql(
        this.$AWS.Query(updateUser, {
            hashKey: ctx.rootState.user.email,
            firstName: ctx.rootState.user.firstName,
            lastName: ctx.rootState.user.lastName,
            picture: ctx.rootState.user.picture,
            birthdate,
            gender: data.gender
        })
    )
        .then((result) => {
            const params = {
                birthdate,
                gender: data.gender
            }

            // Guardar estados para usuario
            ctx.commit('user/setState', { params }, { root: true })
        })
        // eslint-disable-next-line no-console
        .catch(e => console.log(e))
  }
}

export default {
  namespaced: true,
  actions
}
