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
        VERIFY: 'verify'
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
                        console.log(event)
                        this.$store.dispatch('user/verification', event)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
