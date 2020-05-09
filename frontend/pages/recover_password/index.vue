<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <recover-password-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import RecoverPasswordMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{RECOVER: string}}
     */
    const event = {
        RECOVER: 'recover'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También gatillar evento para restablecer la constraseña.
     *
     * @displayName RecoverPasswordMain
     */
    export default {
        name: 'RecoverPassword',
        layout: 'auth',
        components: { RecoverPasswordMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            /**
             * Captura el evento para restablecer la contraseña.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Restablecer contraseña
                    case this.event.RECOVER:
                        this.$store.dispatch('recoverPassword/recoverPassword', event)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
