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
        middleware ({ store, redirect }) {
            // Si se entra a la vista sin email del usuario se devuelve a la pagina start
            if (!store.state.user.id) {
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
                    case this.event.RESET:
                        this.$store.dispatch('resetPassword/resetPassword', event.data)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
