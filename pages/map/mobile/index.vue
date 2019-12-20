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
            <gmap-map :center="center" :map-type-id="mapTypeId" :zoom="15">
                <gmap-marker
                    v-for="(item, index) in markers"
                    :key="index"
                    :position="item.position"
                    @click="center = item.position"
                />
            </gmap-map>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: 'MapMobile',
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                center: { lat: -3.350235, lng: 111.995865 },
                mapTypeId: 'terrain',
                markers: [
                    { position: { lat: -0.48585, lng: 117.1466 } },
                    { position: { lat: -6.9127778, lng: 107.6205556 } }
                ]
            }
        }
    }
</script>

<style scoped>
    .vue-map-container {
        height: 700px;
        max-width: 992px;
        width: 100%;
    }
</style>
