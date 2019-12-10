<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <verification-mobile :userData="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import VerificationMobile from './mobile'

    const event = {
        VERIFY: 'verify',
        RESEND_CODE: 'resend_code'
    }

    export default {
        name: 'Verification',
        components: { VerificationMobile },
        data () {
            return {
                event,
                userData: this.$store.getters['user/userData']
            }
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    case this.event.VERIFY:
                        this.$store.dispatch('user/verification', event)
                        break
                    
                    case this.event.RESEND_CODE:
                        this.$store.dispatch('user/resendCode')
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
