<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <login-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import LoginMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{SIGNIN: string, TO_RECOVER_PASSWORD: string}}
     */
    const event = {
        SIGNIN: 'sigin',
        TO_RECOVER_PASSWORD: 'to_recover_password'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También gatillar el inicio de sesión mediante Arzov o redireccionar
     * a la vista [RecoverPassword](#recoverpassword).
     *
     * @displayName LoginMain
     */
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
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede redireccionar al usuario
             * a la vista [RecoverPassword](#recoverpassword) o iniciar la sesión con Arzov.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Iniciar sesión con Arzov
                    case this.event.SIGNIN:
                        this.$store.dispatch('login/signIn', event)
                        break

                    // Redireccionar a la vista RecoverPassword
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
