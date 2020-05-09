<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <reset-password-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import ResetPasswordMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{RESET: string}}
     */
    const event = {
        RESET: 'reset'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También gatillar el cambio de contraseña.
     *
     * @displayName ResetPasswordMain
     */
    export default {
        name: 'ResetPassword',
        layout: 'auth',
        middleware ({ store, redirect }) {
            // Si se entra a la vista sin email del usuario se devuelve a la pagina start
            if (!store.state.user.email) {
                return redirect('/start')
            }
        },
        components: { ResetPasswordMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            /**
             * Captura el evento para cambiar la contraseña.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Cambiar contraseña
                    case this.event.RESET:
                        this.$store.dispatch('resetPassword/resetPassword', event)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
