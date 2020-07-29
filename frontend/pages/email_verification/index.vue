<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <email-verification-mobile :user-data="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import EmailVerificationMobile from './mobile'

    const event = {
        VERIFY: 'verify',
        RESEND_CODE: 'resend_code'
    }

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
