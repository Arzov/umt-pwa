<template>
    <div id="page-home-mobile">
        <a-row type="flex" justify="center">
            <b>INICIO</b>
            <a-button>
                <nuxt-link to="/profile">
                    perfil
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            RIVALES DISPONIBLES
        </a-row>
        <a-row v-if="usersFound.length" type="flex" justify="center">
            <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="usersFound">
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-list-item-meta
                        :key="index"
                        :description="'A ' + item.distance + ' kilómetros de distancia'"
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
        <a-breadcrumb>
            <a-breadcrumb-item>
                <nuxt-link to="/home">
                    Home
                </nuxt-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <nuxt-link to="/match">
                    Match
                </nuxt-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <nuxt-link to="/map">
                    Map
                </nuxt-link>
            </a-breadcrumb-item>
        </a-breadcrumb>
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
                    index,
                    adversaryName: firstName,
                    adversaryPicture: picture,
                    rangeKey
                }
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>
</style>
