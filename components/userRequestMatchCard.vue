<template>
    <div id="component-user-request-match-card" @click="onClick">
        <div class="image">
            <profile-image type="border-hot bkg-grey" :src="userData.adversaryPicture" />
        </div>

        <div v-if="userData.isCreator" class="text">
            <h5>{{ userData.adversaryName }}</h5>
            <h5 v-if="userData.matchStatus === 'P'">
                Solicitud enviada
            </h5>
            <h5 v-else-if="userData.matchStatus === 'D'">
                Solicitud rechazada
            </h5>
        </div>

        <div v-else>
            <h5>{{ userData.adversaryName }}</h5>
            <h5 v-if="userData.matchStatus === 'P'">
                Aceptar solicitud
            </h5>
            <h5 v-else-if="userData.matchStatus === 'D'">
                Solicitud rechazada
            </h5>
        </div>

        <div class="last-message">
            <h6>Hoy 18:20</h6>
        </div>
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'

    export default {
        name: 'UserRequestMatchCard',
        components: { ProfileImage },
        props: {
            userData: {
                required: true,
                default: {}
            },
            index: {
                required: true
            }
        },
        methods: {
            onClick () {
                this.$emit('click')
            }
        }
    }
</script>
