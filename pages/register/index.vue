<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <register-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import RegisterMobile from './mobile'

    const event = {
        REGISTER: 'register',
        TERMINOS: 'terminos',
        CANCEL: 'cancel'
    }

    export default {
        name: 'Register',
        components: { RegisterMobile },
        data () {
            return {
                event
            }
        },
        methods: {

            onEmit (event) {
                switch (event.type) {
                    case this.event.REGISTER:
                        this.$store.dispatch('user/register', event.data)
                        break
                    case this.event.TERMINOS:
                        break
                    case this.event.CANCEL:
                        console.log('Cancel')
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
