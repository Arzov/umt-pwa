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
        SIGNUP: 'signup',
        TO_TERMS: 'to_terms'
    }

    export default {
        name: 'Register',
        layout: 'auth',
        components: { RegisterMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    // Registrar email con Arzov
                    case this.event.SIGNUP:
                        this.$store.dispatch('register/signUp', event)
                        break

                    // TODO: Se debe redireccionar a los terminos y condiciones
                    case this.event.TO_TERMS:
                        break
                }
            }
        }
    }
</script>
