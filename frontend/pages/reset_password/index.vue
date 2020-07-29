<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <reset-password-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import ResetPasswordMobile from './mobile'

    const event = {
        RESET: 'reset'
    }

    export default {
        name: 'ResetPassword',
        layout: 'auth',
        middleware ({ store, redirect }) {
            // Si se entra a la vista sin email del usuario se devuelve a la pagina start
            if (!store.state.user.email) {
                return redirect('/start')
            }
        },
        components: { ResetPasswordMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    // Cambiar contraseña
                    case this.event.RESET:
                        this.$store.dispatch('resetPassword/resetPassword', event)
                        break
                }
            }
        }
    }
</script>
