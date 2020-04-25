<template>
    <div id="page-recover-password-mobile">
        <header-title-mobile to="/login" title="Recuperar Contraseña" />

        <div>
            <a-form :form="formRecover" @submit="recover($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.email.title">
                        <a-form-item :required="decorator.email.required" :extra="decorator.email.extra">
                            <a-input v-decorator="decorator.email.decorator" :placeholder="decorator.email.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Recuperar contraseña
                    </a-button>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import UInput from '@/components/uInput'
    import HeaderTitleMobile from '@/components/headerTitleMobile'

    /**
     * Componente de la vista [RecoverPassword](#recoverpassword) para dispositivos móviles.
     */
    export default {
        name: 'RecoverPasswordMobile',
        components: { UInput, HeaderTitleMobile },
        props: {
            /**
             * Evento a emitir hacia vista [RecoverPassword](#recoverpassword).
             *
             * @values RECOVER
             */
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRecover: this.$form.createForm(this)
            }
        },
        methods: {
            /**
             * Emite evento para restablecer contraseña.
             *
             * @param {object} event Evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
             */
            recover (event) {
                event.preventDefault()

                this.formRecover.validateFields((error, values) => {
                    if (!error) {
                        const params = {
                            type: this.event.RECOVER,
                            ...values
                        }

                        /**
                         * Evento para restablecer contraseña.
                         *
                         * @event emitRecover
                         * @property {object} params Objecto con tipo RECOVER a emitir.
                         */
                        this.$emit('emit', params)
                    }
                })
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
        <recover-password-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import RecoverPasswordMobile from './mobile'

        const event = {
            RECOVER: 'recover'
        }

        export default {
            components: { RecoverPasswordMobile },
            data () { return { event } },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
