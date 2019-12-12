<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <login-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import LoginMobile from './mobile'

    const event = {
        LOGIN: 'login'
    }

    export default {
        name: 'Login',
        components: { LoginMobile },
        data () {
            return {
                event
            }
        },
        methods: {

            onEmit (event) {
                switch (event.type) {
                    case this.event.LOGIN:
                        this.$store.dispatch('login/signIn', event.data)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
