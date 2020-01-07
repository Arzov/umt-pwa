<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <map-mobile :user-data="userData" :position="position" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import MapMobile from './mobile'

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
                        lat: store.getters['user/userData'].coordinates.latitude,
                        lng: store.getters['user/userData'].coordinates.longitude
                    }
                }

                store.dispatch('map/setPosition', params)
            })
        },
        data () {
            return {
                event,
                userData: this.$store.getters['user/userData'],
                position: this.$store.getters['map/position']
            }
        },
        async beforeMount () {
            this.$store.dispatch('map/fetchCourts')
        }
    }
</script>

<style scoped>
</style>
