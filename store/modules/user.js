import { addUserLocation, updateUser } from '@/graphql/mutations'
import { getUser, getUmatchUser } from '@/graphql/queries'

const state = () => ({
    id: null,
    firstName: null,
    lastName: null,
    birthdate: null,
    gender: null,
    picture: null,
    latitude: null,
    longitude: null,
    geohash: null,
    matchFilter: null,
    genderFilter: null,
    ageMinFilter: null,
    ageMaxFilter: null
})

const getters = {
    userData (state) {
        return {
            id: state.id,
            firstName: state.firstName,
            lastName: state.lastName,
            birthdate: state.birthdate,
            gender: state.gender,
            picture: state.picture,
            genderFilter: state.genderFilter,
            matchFilter: state.matchFilter,
            ageMinFilter: state.ageMinFilter,
            ageMaxFilter: state.ageMaxFilter,
            geohash: state.geohash,
            coordinates: { latitude: state.latitude, longitude: state.longitude }
        }
    }
}

const actions = {
    fetchUserData (context, data) {
        // Usar API de Arzov
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

        // Obtener datos del usuario
        this.$AWS.API.graphql(this.$AWS.Query(getUser, { hashKey: data.idToken.payload.email }))
            .then((result) => {
                const params = {
                    id: result.data.getUser.hashKey,
                    firstName: result.data.getUser.firstName,
                    lastName: result.data.getUser.lastName,
                    birthdate: result.data.getUser.birthdate,
                    gender: result.data.getUser.gender,
                    picture: result.data.getUser.picture
                }

                context.commit('setState', { params })

                // Usar API de Umatch
                this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

                // Obtener datos Umatch del usuario
                this.$AWS.API.graphql(this.$AWS.Query(getUmatchUser, { rangeKey: params.id }))
                    .then((result) => {
                        // Guardar filtros si existen desde DynamoDB
                        if (result.data.getUser.items.length) {
                            const params = {
                                matchFilter: result.data.getUser.items[0].matchFilter,
                                genderFilter: result.data.getUser.items[0].genderFilter,
                                ageMinFilter: result.data.getUser.items[0].ageMinFilter,
                                ageMaxFilter: result.data.getUser.items[0].ageMaxFilter
                            }

                            context.commit('setState', { params })
                        }

                        // Redireccionar a Home
                        this.$router.push(process.env.routes.home.path)
                    })
                    // eslint-disable-next-line no-console
                    .catch(e => console.log(e))
            })
            // eslint-disable-next-line no-console
            .catch(e => console.log(e))
    },
    updatePosition (context, data) {
        // Usar API de Umatch
        this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_UMATCH_URL

        // Actualizar posicion del usuario
        this.$AWS.API.graphql(this.$AWS.Query(addUserLocation, data))
            .then((result) => {
                const params = {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    geohash: result.data.addUserLocation.hashKey
                }

                context.commit('setState', { params })

                // Si la llamada viene desde el componente geoloc, entonces quitar popup de geoloc
                if (data.isSavePosition) {
                    context.dispatch('geoloc/update', { toggle: false }, { root: true })
                }
            })
            // eslint-disable-next-line no-console
            .catch(e => console.log(e))
    },
    saveFilters (context, data) {
        // Validar que todos los campos esten completos
        if (data.gender && data.match) {
            const age = Array.from(data.age, x => String(x))
            const params = {
                matchFilter: data.match,
                genderFilter: data.gender,
                ageMinFilter: age[0],
                ageMaxFilter: age[1]
            }

            context.commit('setState', { params })

            // Enviar a Home
            this.$router.push(process.env.routes.home.path)
        } else {
            // eslint-disable-next-line no-console
            console.log('Debe ingresar todos los datos!')
        }
    },
    saveAttributes (context, data) {
        // Validar que todos los campos esten completos
        if (data.gender && data.birthDay && data.birthMonth && data.birthYear) {
            // Revisar que la fecha de nacimiento sea la correcta
            const birthdate = String(data.birthYear) + '-' + data.birthMonth + '-' + data.birthDay
            const validBirthdate = new Date(data.birthYear, (+data.birthMonth - 1), data.birthDay)

            // Fecha invalida (solo se valida mes de febrero donde podria haber error)
            if (validBirthdate.getMonth() !== (+data.birthMonth - 1)) {
                // eslint-disable-next-line no-console
                console.log('Debe ingresar una fecha valida!')

                // Fecha valida
            } else {
                // Validar mayoria de edad (18 anos)
                const today = new Date()
                const m = today.getMonth() - validBirthdate.getMonth()
                let age = today.getFullYear() - validBirthdate.getFullYear()

                // Calculo de edad correcta
                if (m < 0 || (m === 0 && today.getDate() < validBirthdate.getDate())) {
                    age--
                }

                if (age < 18) {
                    // eslint-disable-next-line no-console
                    console.log('Debe ser mayor de 18 anos!')
                } else {
                    // Usar API de Arzov
                    this.$AWS.API._options.aws_appsync_graphqlEndpoint = process.env.aws.APPSYNC_ARZOV_URL

                    // Actualizar datos del usuario
                    this.$AWS.API.graphql(
                        this.$AWS.Query(updateUser, {
                            hashKey: context.state.id,
                            firstName: context.state.firstName,
                            lastName: context.state.lastName,
                            picture: context.state.picture,
                            birthdate,
                            gender: data.gender
                        })
                    )
                        .then((result) => {
                            const params = {
                                birthdate,
                                gender: data.gender
                            }

                            context.commit('setState', { params })

                            // Enviar a Home
                            this.$router.push(process.env.routes.home.path)
                        })
                        // eslint-disable-next-line no-console
                        .catch(e => console.log(e))
                }
            }
        } else {
            // eslint-disable-next-line no-console
            console.log('Debe ingresar todos los datos!')
        }
    },
    resetStates (context) {
        context.commit('resetStates')
    }
}

const mutations = {
    setState (state, { params }) {
        // eslint-disable-next-line no-unused-vars
        for (const key in params) {
            state[key] = params[key]
        }
    },
    resetStates (state) {
        state.id = null
        state.firstName = null
        state.lastName = null
        state.birthdate = null
        state.gender = null
        state.picture = null
        state.latitude = null
        state.longitude = null
        state.geohash = null
        state.matchFilter = null
        state.genderFilter = null
        state.ageMinFilter = null
        state.ageMaxFilter = null
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
