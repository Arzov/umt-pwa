<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <start-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import StartMobile from './mobile'

    const event = {
        TO_LOGIN: 'to_login',
        TO_REGISTER: 'to_register'
    }

    export default {
        name: 'Start',
        layout: 'auth',
        components: { StartMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    // Redireccionar a la vista Login
                    case this.event.TO_LOGIN:
                        this.$router.push(process.env.routes.login.path)
                        break

                    // Redireccionar a la vista Register
                    case this.event.TO_REGISTER:
                        this.$router.push(process.env.routes.register.path)
                        break
                }
            }
        }
    }
</script>
