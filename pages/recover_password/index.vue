<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <recover-password-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import RecoverPasswordMobile from './mobile'

    const event = {
        RECOVER: 'recover'
    }

    export default {
        name: 'RecoverPassword',
        components: { RecoverPasswordMobile },
        data () {
            return {
                event
            }
        },
        methods: {

            onEmit (event) {
                switch (event.type) {
                    case this.event.RECOVER:
                        this.$store.dispatch('recoverPassword/recoverPassword', event.data)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
