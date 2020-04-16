<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <profile-mobile :user-data="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import ProfileMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{SAVE_PROFILE: string, SIGNOUT: string}}
     */
    const event = {
        SAVE_PROFILE: 'save_profile',
        SIGNOUT: 'signout'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También guardar los datos del usuario o cerrar sesión.
     *
     * @displayName ProfileMain
     */
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
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede guardar los datos del
             * usuario o cerrar sesión.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Guardar datos
                    case this.event.SAVE_PROFILE:
                        this.$store.dispatch('profile/saveProfile', event.data)
                            .then(() => {
                                this.$router.push(process.env.routes.home.path)
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
