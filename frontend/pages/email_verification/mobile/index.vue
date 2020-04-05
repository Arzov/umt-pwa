<template>
    <div id="page-email-verification-mobile">
        <header-title-mobile to="/start" title="verificar" />

        <div>
            <a-form :form="formVerification" @submit="verify($event)">
                <a-row type="flex" justify="center">
                    <h6>Ingresa tu código de verificación</h6>
                </a-row>

                <a-row type="flex" justify="center">
                    <h6 class="email">
                        {{ email }}
                    </h6>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.code.required" :extra="decorator.code.extra" u-form-custom-item>
                        <code-input v-decorator="decorator.code.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Enviar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a u-anchor u-size="large" @click="resendCode">
                        <span u-a>Reenviar código</span>
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import CodeInput from '@/components/codeInput'

    /**
     * Componente de la vista [EmailVerification](#email-verification) para dispositivos móviles.
     */
    export default {
        name: 'EmailVerificationMobile',
        components: { CodeInput },
        props: {
            /**
             * Evento a emitir hacia vista [EmailVerification](#email-verification).
             *
             * @values VERIFY, RESEND_CODE
             */
            event: {
                type: Object,
                required: true
            },
            
            /**
             * Datos del usuario para obtener su email.
             */
            userData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formVerification: this.$form.createForm(this)
            }
        },
        computed: {
            email () {
                return this.userData.email
            }
        },
        methods: {
            /**
             * Emite evento para verificar el email.
             *
             * @param {object} event Evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
             */
            verify (event) {
                event.preventDefault()

                this.formVerification.validateFields((error, data) => {
                    if (!error) {
                        const params = {
                            type: this.event.VERIFY,
                            ...data
                        }

                        /**
                         * Evento para verificar el email.
                         *
                         * @event emitVerify
                         * @property {object} params Objecto con tipo VERIFY a emitir y
                         *                           datos para verificación (email y código).
                         */
                        this.$emit('emit', params)
                    }
                })
            },

            /**
             * Emite evento para reenviar código de verificación.
             *
             * @return {object} Evento a gatillar.
             * @public
             */
            resendCode () {
                const params = {
                    type: this.event.RESEND_CODE
                }

                /**
                 * Evento para reenviar código.
                 *
                 * @event emitResendCode
                 * @property {object} params Objecto con tipo RESEND_CODE a emitir.
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
        <email-verification-mobile :user-data="userData" :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import EmailVerificationMobile from './mobile'

        const event = {
            VERIFY: 'verify',
            RESEND_CODE: 'resend_code'
        }

        export default {
            components: { EmailVerificationMobile },
            data () {
                return {
                    event,
                    userData: ... // Datos del usuario, debe tener atributo email
                }
            },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
