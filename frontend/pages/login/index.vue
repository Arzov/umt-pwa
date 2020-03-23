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
        LOGIN: 'login',
        TO_RECOVER_PASSWORD: 'to_recover_password'
    }

    export default {
        name: 'Login',
        layout: 'auth',
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

                    case this.event.TO_RECOVER_PASSWORD:
                        this.$router.push(process.env.routes.recover_password.path)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
