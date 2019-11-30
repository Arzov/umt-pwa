<template>
    <div id="page-home-mobile">
        <a-row type="flex" justify="center">
            RIVALES DISPONIBLES
        </a-row>
        <a-row v-if="mapUsers.length" type="flex" justify="center">
            <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="mapUsers">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta
                        :description="'A ' + item.distance + ' kilómetros de distancia'"
                        :key="index"
                    >
                        <a slot="title" href="https://vue.ant.design/">{{ item.firstName + ' ' + item.age }}</a>
                        <a-avatar
                            slot="avatar"
                            :src="item.picture"
                        />
                    </a-list-item-meta>
                    <a-button @click="addMatch(item.hashKey, item.firstName, item.picture, index)">
                        aceptar
                    </a-button>
                </a-list-item>
            </a-list>
            <a-button @click="searchMatch">
                Seguir Buscando
            </a-button>
        </a-row>
        <a-row v-else type="flex" justify="center">
            ¡No hay usuarios cercanos! Inténtalo más tarde.
            <a-button @click="searchMatch">
                Buscar
            </a-button>
        </a-row>
        <Geolocation />
    </div>
</template>

<script>
    import Geolocation from '@/components/geoloc'

    export default {
        name: 'HomeMobile',
        components: { Geolocation },
        props: {
            event: {
                required: true
            },
            usersFound: {
                required: true
            },
            getDistance: {
                required: true
            }
        },
        computed: {
            mapUsers () {
                return this.usersFound.map((user, idx) => {
                    const userEdited = {
                        hashKey: user.hashKey,
                        firstName: user.firstName,
                        age: user.age,
                        picture: user.picture,
                        distance: Math.round(this.getDistance(
                            user.geoJson[1],
                            user.geoJson[0],
                            this.$store.getters['user/userData'].coordinates.latitude,
                            this.$store.getters['user/userData'].coordinates.longitude
                        ))
                    }
                    return userEdited
                })
            }
        },
        methods: {
            /**
             * Metodo que busca un encuentro con algun equipo rival.
             * @return {Object} Evento de tipo SEARCH_MATCH.
             */
            searchMatch () {
                const params = {
                    type: this.event.SEARCH_MATCH
                }
                this.$emit('emit', params)
            },
            /**
             * Metodo que envia solicitud de match al rival.
             * @return {Object} Evento de tipo ADD_MATCH.
             */
            addMatch (rangeKey, firstName, picture, index) {
                const params = {
                    type: this.event.ADD_MATCH,
                    adversaryName: firstName,
                    adversaryPicture: picture,
                    rangeKey
                }
                this.$emit('emit', params)
                this.usersFound.splice(index, 1)
            }
        }
    }
</script>

<style scoped>
</style>
