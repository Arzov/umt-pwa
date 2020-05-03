<template>
    <div id="page-map-mobile">
        <div id="map" class="google-map" />
        <a-button class="center-button" type="primary" @click="toCenter">
            centrar
        </a-button>
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
                disableDefaultUI: true,
                styles: [
                    {
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#151515'
                            }
                        ]
                    },
                    {
                        elementType: 'labels.text.fill',
                        stylers: [
                            {
                                color: '#0cecf2'
                            }
                        ]
                    },
                    {
                        elementType: 'labels.text.stroke',
                        stylers: [
                            {
                                color: '#151515'
                            }
                        ]
                    },
                    {
                        featureType: 'administrative',
                        elementType: 'geometry',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    },
                    {
                        featureType: 'landscape.man_made',
                        elementType: 'geometry.fill',
                        stylers: [
                            {
                                color: '#151515'
                            }
                        ]
                    },
                    {
                        featureType: 'landscape.man_made',
                        elementType: 'geometry.stroke',
                        stylers: [
                            {
                                color: '#ad64e6'
                            }
                        ]
                    },
                    {
                        featureType: 'landscape.natural',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#6457e3'
                            }
                        ]
                    },
                    {
                        featureType: 'poi',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.icon',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [
                            {
                                color: '#ffffff'
                            }
                        ]
                    },
                    {
                        featureType: 'road',
                        elementType: 'labels.text.stroke',
                        stylers: [
                            {
                                color: '#151515'
                            }
                        ]
                    },
                    {
                        featureType: 'road.arterial',
                        elementType: 'geometry.fill',
                        stylers: [
                            {
                                color: '#242728'
                            }
                        ]
                    },
                    {
                        featureType: 'road.arterial',
                        elementType: 'geometry.stroke',
                        stylers: [
                            {
                                color: '#242728'
                            }
                        ]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#ad64e6'
                            }
                        ]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [
                            {
                                color: '#151515'
                            }
                        ]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [
                            {
                                color: '#0cecf2'
                            }
                        ]
                    },
                    {
                        featureType: 'road.highway',
                        elementType: 'labels.text.stroke',
                        stylers: [
                            {
                                color: '#151515'
                            },
                            {
                                weight: 2
                            }
                        ]
                    },
                    {
                        featureType: 'road.local',
                        elementType: 'geometry.fill',
                        stylers: [
                            {
                                color: '#242728'
                            }
                        ]
                    },
                    {
                        featureType: 'road.local',
                        elementType: 'geometry.stroke',
                        stylers: [
                            {
                                color: '#242728'
                            }
                        ]
                    },
                    {
                        featureType: 'transit',
                        stylers: [
                            {
                                visibility: 'off'
                            }
                        ]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [
                            {
                                color: '#0271c4'
                            }
                        ]
                    },
                    {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [
                            {
                                color: '#151515'
                            }
                        ]
                    }
                ]
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
                position: { lat: this.userData.latitude, lng: this.userData.longitude },
                map: this.map
            })
        },
        methods: {
            toCenter () {
                this.map.panTo({
                    lat: this.userData.latitude,
                    lng: this.userData.longitude
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
