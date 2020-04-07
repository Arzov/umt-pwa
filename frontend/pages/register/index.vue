<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <register-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import RegisterMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{SIGNUP: string, TO_TERMS: string}}
     */
    const event = {
        SIGNUP: 'signup',
        TO_TERMS: 'to_terms'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También gatillar el registro mediante Arzov o redireccionar
     * a los **términos y condiciones**.
     *
     * @displayName RegisterMain
     */
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
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede redireccionar al usuario
             * a los **términos y condiciones** o registrarse con Arzov.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Registrar email con Arzov
                    case this.event.SIGNUP:
                        this.$store.dispatch('register/signUp', event.data)
                        break

                    // TODO: Se debe redireccionar a los terminos y condiciones
                    case this.event.TO_TERMS:
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
