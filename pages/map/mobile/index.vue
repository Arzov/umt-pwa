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
            },
            courtsList: {
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
            this.courtsList.map((x) => {
                // eslint-disable-next-line no-unused-vars
                const marker = new window.google.maps.Marker({
                    position: { lat: x.geoJson[1], lng: x.geoJson[0] },
                    label: {
                        color: 'black',
                        fontWeight: 'bold',
                        text: x.name
                    },
                    icon: {
                        labelOrigin: new window.google.maps.Point(0, 0),
                        url: 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2_hdpi.png',
                        scaledSize: new window.google.maps.Size(30, 45)
                    },
                    map: this.map
                })
            })

            // eslint-disable-next-line no-unused-vars
            const currentMarker = new window.google.maps.Marker({
                position: { lat: this.userData.coordinates.latitude, lng: this.userData.coordinates.longitude },
                map: this.map
            })
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
