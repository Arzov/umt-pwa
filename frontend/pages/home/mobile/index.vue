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

        <div v-if="!searchingUsers">
            <div v-if="usersFound.length" class="rivals">
                <user-search-card v-for="(user, index) in usersFound" :key="user.hashKey" :user-data="user" :index="index" @submit="requestMatch($event)" />
            </div>

            <a-row v-else type="flex" justify="center" align="middle" class="rivals">
                <h5>¡No hay usuarios cercanos! Inténtalo más tarde.</h5>
            </a-row>
        </div>

        <!--TODO: falta mostrar spin de cargando-->
        <a-row v-else type="flex" justify="center" align="middle" class="rivals">
            <h5>Cargando.</h5>
        </a-row>

        <a-row type="flex" justify="center" class="button-row">
            <!--TODO: mostrar spin de cargando cuando searchingUsers = true-->
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
                type: Object,
                required: true
            },
            usersFound: {
                type: Array,
                required: true
            },
            userData: {
                type: Object,
                required: true
            },
            searchingUsers: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            searchMatch () {
                const params = {
                    type: this.event.SEARCH_MATCH
                }
                this.$emit('emit', params)
            },
            requestMatch ({ rangeKey, firstName, picture, index }) {
                const params = {
                    type: this.event.REQUEST_MATCH,
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
