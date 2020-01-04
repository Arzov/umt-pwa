<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <profile-mobile :userData="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import ProfileMobile from './mobile'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{SAVE_PROFILE: string, LOGOUT: string}}
     */
    const event = {
        SAVE_PROFILE: 'save_profile',
        LOGOUT: 'logout'
    }

    export default {
        name: 'Profile',
        components: { ProfileMobile },
        data () {
            return {
                event,
                userData: this.$store.getters['user/userData']
            }
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param  {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    // Guardar filtros seleccionados
                    case this.event.SAVE_PROFILE:
                        this.$store.dispatch('profile/saveProfile', event.data)
                        break

                    // Cerrar sesion
                    case this.event.LOGOUT:
                        this.$AWS.Auth.signOut({ global: true })
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
