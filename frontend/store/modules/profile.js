import { updateUser, updateUmatchUser } from '@/graphql/mutations'
import validationBirthdate from '@/utils/validationBirthdate'

const state = () => ({
})

const getters = {
}

const actions = {
    saveProfile (ctx, data) {
        // Validar edad
        const validBirthdate = validationBirthdate(data.birthdate)
        const birthdate = String(data.birthdate.year) + '-' + data.birthdate.month + '-' + data.birthdate.day

        if (validBirthdate.status) {
            // Usar API de Arzov
            this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

            // Actualizar datos del usuario
            this.$AWS.API.graphql(
                this.$AWS.Query(updateUser, {
                    hashKey: ctx.rootState.user.id,
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
                            rangeKey: ctx.rootState.user.id,
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
        } else {
            console.log(validBirthdate.msg)
        }
    }
}

const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
