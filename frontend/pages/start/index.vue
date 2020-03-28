<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <start-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import StartMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{TO_LOGIN: string, TO_REGISTER: string}}
     */
    const event = {
        TO_LOGIN: 'to_login',
        TO_REGISTER: 'to_register'
    }

    /**
     * Vista principal que decide cual componente inicializar (mobile o desktop).
     * También redirecciona al usuario a la vista [Login](#login) o [Register](#register).
     *
     * @displayName StartMain
     */
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
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede redireccionar al usuario
             * a la vista [Login](#login) o [Register](#register).
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
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

<style scoped>

</style>
