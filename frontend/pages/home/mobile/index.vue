<template>
    <div id="page-home-mobile">
        <div class="profile">
            <div class="text">
                <h3>¡Hola! {{ userData.firstName }}</h3>
                <h3>Busca a tus rivales.</h3>
            </div>

            <profile-image type="border-cold bkg-black" :src="userData.picture" to="/profile" />
        </div>

        <a-row type="flex" justify="center">
            <h5 class="title-rivals">
                RIVALES DISPONIBLES
            </h5>
        </a-row>

        <div v-if="usersFound.length" class="rivals">
            <user-search-card v-for="(user, index) in usersFound" :key="user.hashKey" :user-data="user" :index="index" @submit="requestMatch($event)" />
        </div>

        <a-row v-else type="flex" justify="center" align="middle" class="rivals">
            <h5>¡No hay usuarios cercanos! Inténtalo más tarde.</h5>
        </a-row>

        <a-row type="flex" justify="center" class="button-row">
            <a-button u-button u-type="primary" block @click="searchMatch">
                Seguir Buscando
            </a-button>
        </a-row>
        
        <Geolocation />
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'
    import UserSearchCard from '@/components/userSearchCard'
    import Geolocation from '@/components/geoloc'

    /**
     * Componente de la vista [Home](#home) para dispositivos móviles.
     */
    export default {
        name: 'HomeMobile',
        components: { ProfileImage, UserSearchCard, Geolocation },
        props: {
            /**
             * Evento a emitir hacia vista [Home](#home).
             *
             * @values SEARCH_MATCH, REQUEST_MATCH
             */
            event: {
                type: Object,
                required: true
            },

            /**
             * Objeto con listado de rivales encontrados.
             */
            usersFound: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                userData: this.$store.getters['user/userData']
            }
        },
        methods: {
            /**
             * Emite evento para buscar rivales.
             *
             * @return {object} Evento a gatillar.
             * @public
             */
            searchMatch () {
                const params = {
                    type: this.event.SEARCH_MATCH
                }

                /**
                 * Evento para buscar rivales cercanos.
                 *
                 * @event emitSearchMatch
                 * @property {object} params Objecto con tipo SEARCH_MATCH a emitir.
                 */
                this.$emit('emit', params)
            },

            /**
             * Emite evento para enviar solicitud de _match_ a un rival.
             *
             * @return {object} Evento a gatillar.
             * @public
             */
            requestMatch ({ rangeKey, firstName, picture, index }) {
                const params = {
                    type: this.event.REQUEST_MATCH,
                    index,
                    adversaryName: firstName,
                    adversaryPicture: picture,
                    rangeKey
                }

                /**
                 * Evento para enviar solicitud de _match_ a un rival.
                 *
                 * @event emitRequestMatch
                 * @property {object} params Objecto con tipo REQUEST_MATCH a emitir y datos
                 *                           para agregar la solicitud (Pocisión de búsqueda del rival,
                 *                           Nombre del rival, Foto de perfil del
                 *                           rival y email del rival).
                 */
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>
</style>

<docs>
    EXAMPLE

    ```html
    <template>
        <home-mobile :users-found="usersFound" :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import HomeMobile from './mobile'

        const event = {
            SEARCH_MATCH: 'search_match',
            REQUEST_MATCH: 'request_match'
        }

        export default {
            components: { HomeMobile },
            data () {
                return {
                    event,
                    usersFound: ... // Listado de rivales encontrados
                }
            },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
