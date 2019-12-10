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
        TERMS: 'terms'
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

                    case this.event.TERMS:
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
