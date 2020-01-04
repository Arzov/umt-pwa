<template>
    <div id="page-map-mobile">
        <a-row type="flex" justify="center">
            <a-button>
                <nuxt-link to="/home">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row>
            <div id="map" class="google-map" />
            <a-button @click="toCenter">
                centrar
            </a-button>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: 'MapMobile',
        props: {
            event: {
                required: true
            },
            userData: {
                required: true
            },
            position: {
                required: true
            }
        },
        data () {
            return {
                map: undefined
            }
        },
        mounted () {
            // eslint-disable-next-line
            this.map = new window.google.maps.Map(document.getElementById('map'), {
                center: this.position,
                zoom: 16,
                disableDefaultUI: true
            })

            // Marcadores de canchas
            let markers = [
                {
                    position: { lat: this.userData.coordinates.latitude, lng: this.userData.coordinates.longitude }
                },
                {
                    position: { lat: -33.4178484, lng: -70.6591775 }
                }
            ]

            for (let i = 0; i < markers.length; i++) {
                // eslint-disable-next-line
                const marker = new window.google.maps.Marker({
                    position: markers[i].position,
                    map: this.map
                })
            }
        },
        methods: {
            toCenter () {
                this.map.panTo({
                    lat: this.userData.coordinates.latitude,
                    lng: this.userData.coordinates.longitude
                })
            }
        }
    }
</script>

<style scoped>
    .google-map {
        height: 700px;
    }
</style>
