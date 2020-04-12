<template>
    <div id="page-start-mobile">
        <a-row type="flex" justify="center" align="top">
            <img src="./../../../assets/images/SVG/logo.svg" alt="">
        </a-row>

        <a-row type="flex" justify="center">
            <a-button u-button u-type="primary" block @click="toAuth(event.TO_LOGIN)">
                Iniciar sesión
            </a-button>

            <FacebookLogin />

            <GoogleLogin />

            <a u-anchor @click="toAuth(event.TO_REGISTER)">
                ¿No tienes cuenta? <span u-a>Regístrate.</span>
            </a>
        </a-row>

        <a-row type="flex" justify="center">
            <img src="./../../../assets/images/SVG/arzov_logo_wordmark_mono_white.svg" alt="">
        </a-row>
    </div>
</template>

<script>
    import FacebookLogin from '@/components/facebookLogin'
    import GoogleLogin from '@/components/googleLogin'

    /**
     * Componente de la vista [Start](#start) para dispositivos móviles.
     */
    export default {
        name: 'StartMobile',
        components: { FacebookLogin, GoogleLogin },
        props: {
            /**
             * Evento a emitir hacia vista [Start](#start).
             *
             * @values TO_LOGIN, TO_REGISTER
             */
            event: {
                type: Object,
                required: true
            }
        },
        methods: {
            /**
             * Emite evento para redireccionar a la vista [Login](#login) o [Register](#register).
             *
             * @param {string} eventType Tipo de evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
             */
            toAuth (eventType) {
                const params = {
                    type: eventType
                }

                /**
                 * Evento para redireccionar a la vista [Login](#login) o [Register](#register).
                 *
                 * @event emitAuth
                 * @property {object} params Objecto con tipo a emitir.
                 */
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>

<docs>
    EXAMPLE

    ```html
    <template>
        <start-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import StartMobile from './mobile'

        const event = {
            TO_LOGIN: 'to_login',
            TO_REGISTER: 'to_register'
        }

        export default {
            components: { StartMobile },
            data () { return { event } },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
