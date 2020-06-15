<template>
    <div v-if="this.$store.getters['geoloc/toggle']" id="component-geoloc">
        <div class="card">
            <a-row v-if="this.$store.getters['geoloc/allow']">
                <a-row type="flex" justify="center" align="top">
                    <img src="./../assets/icons/pin.svg">
                </a-row>

                <div>
                    <h3>Comparte tu ubicación</h3>
                
                    <p>
                        Umatch utiliza tu ubicación para encontrar rivales cercanos. Presiona el botón "Aceptar" y luego debes permitir el acceso a la ubicación, de lo contrario no podrás usar la aplicación.
                    </p>
                </div>

                <div>
                    <a-row type="flex" justify="center" u-button-row>
                        <a-button u-button u-type="primary" block @click="getPosition">
                            Aceptar
                        </a-button>
                    </a-row>

                    <a-row type="flex" justify="center" u-button-row>
                        <a u-anchor u-size="large" @click="logout">
                            <span u-a>Cerrar sesión</span>
                        </a>
                    </a-row>
                </div>
            </a-row>

            <a-row v-else>
                <a-row type="flex" justify="center" align="top">
                    <img src="./../assets/icons/pin.svg">
                </a-row>

                <div>
                    <h3>¡Ubicación denegada!</h3>
                
                    <p>
                        Necesitas habilitar la ubicación para utilizar la aplicación. Debes configurar tu navegador.
                    </p>
                </div>

                <div>
                    <a-row type="flex" justify="center" u-button-row>
                        <!--TODO: falta implementar acción-->
                        <a-button u-button u-type="primary" block>
                            Configurar
                        </a-button>
                    </a-row>

                    <a-row type="flex" justify="center" u-button-row>
                        <a u-anchor u-size="large" @click="resetStates">
                            <span u-a>Atrás</span>
                        </a>
                    </a-row>
                </div>
            </a-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Geolocation',
        methods: {
            getPosition () {
                const vue = this

                // Obtener ubicacion del usuario
                navigator.geolocation.getCurrentPosition(function (position) {
                    // Parametros para graphql
                    const userData = vue.$store.getters['user/userData']

                    const params = {
                        rangeKey: userData.email,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        genderFilter: userData.genderFilter,
                        matchFilter: userData.matchFilter,
                        ageMinFilter: userData.ageMinFilter,
                        ageMaxFilter: userData.ageMaxFilter,
                        isSavePosition: true
                    }

                    vue.$store.dispatch('user/updatePosition', params)

                    // Error en la peticion de la ubicacion
                }, function (error) {
                    // Parametros para dispatch
                    const params = {
                        toggle: true,
                        allow: false
                    }

                    switch (error.code) {
                        // Permiso denegado
                        case error.PERMISSION_DENIED:
                            // Mostrar popup para que el usuario configure la ubicacion
                            vue.$store.dispatch('geoloc/update', params)
                            break

                        default:
                            console.log('Error desconocido.')
                            break
                    }
                })
            },
            resetStates () {
                this.$store.dispatch('geoloc/resetStates')
            },
            logout () {
                this.$AWS.Auth.signOut({ global: true })
            }
        }
    }
</script>

<style scoped>

</style>
