<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <map-mobile :user-data="userData" :position="position" :courts-list="courtsList" />
        </mq-layout>
    </div>
</template>

<script>
    import MapMobile from './mobile'

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También permite obtener las canchas cercanas al usuario.
     *
     * @displayName MapMain
     */
    export default {
        name: 'Map',
        components: { MapMobile },
        middleware ({ store, redirect }) {
            // Guardar posicion actual
            navigator.geolocation.getCurrentPosition(function (position) {
                const params = {
                    position: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }

                store.dispatch('map/setPosition', params)
            }, function (error) {
                console.log(error)
                
                const params = {
                    position: {
                        lat: store.getters['user/userData'].latitude,
                        lng: store.getters['user/userData'].longitude
                    }
                }

                store.dispatch('map/setPosition', params)
            })
        },
        data () {
            return {
                userData: this.$store.getters['user/userData'],
                position: this.$store.getters['map/position'],
                courtsList: this.$store.getters['map/courtsList']
            }
        },
        async beforeMount () {
            this.$store.dispatch('map/fetchCourts')
        },
        mounted () {
            this.$store.commit('navigation/setTitle', 'Canchas')
            this.$store.commit('navigation/setUrl', '')
        }
    }
</script>

<style scoped>
</style>
