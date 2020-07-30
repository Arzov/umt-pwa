<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <profile-mobile :user-data="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import ProfileMobile from './mobile'

    const event = {
        UPLOAD_PHOTO: 'upload_photo',
        SAVE_PROFILE: 'save_profile',
        SIGNOUT: 'signout'
    }

    export default {
        name: 'Profile',
        layout: 'empty',
        components: { ProfileMobile },
        data () {
            return {
                event,
                userData: this.$store.getters['user/userData']
            }
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    // Subir foto de perfil
                    case this.event.UPLOAD_PHOTO:
                        this.$store.dispatch('profile/uploadPhoto', event)
                            .then(() => {
                                // Datos guardados
                                // TODO: Terminar spin o loading
                            })
                            // TODO: falta implementar popup.
                            .catch(e => console.log(e))
                        break

                    // Guardar datos
                    case this.event.SAVE_PROFILE:
                        this.$store.dispatch('profile/saveProfile', event)
                            .then(() => {
                                // Datos guardados
                                // TODO: Terminar spin o loading
                            })
                            // TODO: falta implementar popup.
                            .catch(e => console.log(e))
                        break

                    // Cerrar sesion
                    case this.event.SIGNOUT:
                        this.$AWS.Auth.signOut({ global: true })
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
