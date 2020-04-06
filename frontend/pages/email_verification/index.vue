<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <email-verification-mobile :user-data="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import EmailVerificationMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{VERIFY: string, RESEND_CODE: string}}
     */
    const event = {
        VERIFY: 'verify',
        RESEND_CODE: 'resend_code'
    }

    /**
     * Vista principal que decide cual componente inicializar (mobile o desktop).
     * También gatillar la verificación del email del usuario o reenviar nuevo código
     * de validación.
     *
     * @displayName EmailVerificationMain
     */
    export default {
        name: 'EmailVerification',
        components: { EmailVerificationMobile },
        layout: 'auth',
        data () {
            return {
                event,
                userData: this.$store.getters['user/userData']
            }
        },
        methods: {
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede verificar el email o
             * reenviar un nuevo código de verificación.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Verificar email
                    case this.event.VERIFY:
                        this.$store.dispatch('emailVerification/verify', event)
                        break
                    
                    // Reenviar codigo de verificacion
                    case this.event.RESEND_CODE:
                        this.$store.dispatch('emailVerification/resendCode')
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
