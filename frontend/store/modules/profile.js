import { updateUser, updateUmatchUser } from '@/graphql/mutations'

const actions = {
    saveProfile (ctx, data) {
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
                let params = {
                    birthdate,
                    gender: data.gender
                }

                ctx.commit('user/setState', { params }, { root: true })

                // Actualizar filtros de Umatch
                const ageFilter = Array.from(data.ageFilter, x => String(x))

                // Usar API de Umatch
                this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

                // Actualizar datos del usuario
                this.$AWS.API.graphql(
                    this.$AWS.Query(updateUmatchUser, {
                        hashKey: ctx.rootState.user.geohash,
                        rangeKey: ctx.rootState.user.email,
                        genderFilter: data.genderFilter,
                        ageMinFilter: ageFilter[0],
                        ageMaxFilter: ageFilter[1],
                        matchFilter: data.matchFilter
                    })
                )
                    .then((result) => {
                        params = {
                            matchFilter: data.matchFilter,
                            genderFilter: data.genderFilter,
                            ageMinFilter: Number(ageFilter[0]),
                            ageMaxFilter: Number(ageFilter[1])
                        }

                        ctx.commit('user/setState', { params }, { root: true })
                    })
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
                    })
            // eslint-disable-next-line no-console
            .catch(e => console.log(e))
    }
}

export default {
    namespaced: true,
    actions
}
