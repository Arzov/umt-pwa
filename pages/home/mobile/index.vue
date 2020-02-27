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
            <user-search-card v-for="(user, index) in usersFound" :key="user.hashKey" :user-data="user" :index="index" @submit="addMatch($event)" />
        </div>

        <a-row v-else class="rivals">
            ¡No hay usuarios cercanos! Inténtalo más tarde.
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

    export default {
        name: 'HomeMobile',
        components: { ProfileImage, UserSearchCard, Geolocation },
        props: {
            event: {
                required: true
            },
            usersFound: {
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
            addMatch ({ rangeKey, firstName, picture, index }) {
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
