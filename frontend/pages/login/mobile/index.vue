<template>
    <div id="page-login-mobile">
        <header-title-mobile to="/start" title="Inicio de Sesión" />
        
        <div>
            <a-form :form="formLogin" @submit="signIn($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.email.title">
                        <a-form-item :required="decorator.email.required" :extra="decorator.email.extra">
                            <a-input v-decorator="decorator.email.decorator" :placeholder="decorator.email.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.password.title">
                        <a-form-item :required="decorator.password.required" :extra="decorator.password.extra">
                            <a-input-password v-decorator="decorator.password.decorator" :placeholder="decorator.password.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a-button u-button u-type="primary" u-size="large" html-type="submit" block>
                        Iniciar Sesión
                    </a-button>
                </a-row>
            </a-form>

            <a-row type="flex" justify="center" u-button-row>
                <a u-anchor u-size="large" @click="toRecoverPassword">
                    ¿Olvidaste tu contraseña? <span u-a>Recupérala.</span>
                </a>
            </a-row>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import UInput from '@/components/uInput'
    import HeaderTitleMobile from '@/components/headerTitleMobile'

    /**
     * Componente de la vista Login para dispositivos móviles.
     */
    export default {
        name: 'LoginMobile',
        components: { UInput, HeaderTitleMobile },
        props: {
            /**
             * Evento a emitir hacia vista [Login](#login).
             *
             * @values SIGNIN, TO_RECOVER_PASSWORD
             */
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formLogin: this.$form.createForm(this)
            }
        },
        methods: {
            /**
             * Emite evento para iniciar sesión.
             *
             * @param {object} event Evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
             */
            signIn (event) {
                event.preventDefault()

                this.formLogin.validateFields((error, data) => {
                    if (!error) {
                        const params = {
                            type: this.event.SIGNIN,
                            data
                        }

                        /**
                         * Evento para iniciar sesión.
                         *
                         * @event emitSignIn
                         * @property {object} params Objecto con tipo SIGNIN a emitir
                         *                           y datos para iniciar sesión (email
                         *                           y contraseña).
                         */
                        this.$emit('emit', params)
                    }
                })
            },

            /**
             * Emite evento para ir a la vista [RecoverPassword](#recoverpassword).
             *
             * @return {object} Evento a gatillar.
             * @public
             */
            toRecoverPassword () {
                const params = {
                    type: this.event.TO_RECOVER_PASSWORD
                }

                /**
                 * Evento para ir a la vista [RecoverPassword](#recoverpassword).
                 *
                 * @event emitToRecoverPassword
                 * @property {object} params Objecto de tipo TO\_RECOVER\_PASSWORD a emitir.
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

    ```html static
    <template>
        <login-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import LoginMobile from './mobile'

        const event = {
            SIGNIN: 'sigin',
            TO_RECOVER_PASSWORD: 'to_recover_password'
        }

        export default {
            components: { LoginMobile },
            data () { return { event } },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
