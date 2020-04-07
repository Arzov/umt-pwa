<template>
    <div id="page-reset-password-mobile">
        <header-title-mobile to="/login" title="Recuperar Contraseña" />

        <div>
            <a-form :form="formReset" @submit="reset($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.code.title">
                        <a-form-item :required="decorator.code.required" :extra="decorator.code.extra">
                            <a-input v-decorator="decorator.code.decorator" :placeholder="decorator.code.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.newPassword.title">
                        <a-form-item :required="decorator.newPassword.required" :extra="decorator.newPassword.extra">
                            <a-input-password v-decorator="decorator.newPassword.decorator" :placeholder="decorator.newPassword.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" class="row-margin-top">
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
     * Componente de la vista [ResetPassword](#resetpassword) para dispositivos móviles.
     */
    export default {
        name: 'ResetPasswordMobile',
        components: { UInput, HeaderTitleMobile },
        props: {
            /**
             * Evento a emitir hacia vista [ResetPassword](#resetpassword).
             *
             * @values RESET
             */
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formReset: this.$form.createForm(this)
            }
        },
        methods: {
            /**
             * Emite evento para cambiar contraseña.
             *
             * @param {object} event Evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
             */
            reset (event) {
                event.preventDefault()

                this.formReset.validateFields((error, data) => {
                    if (!error) {
                        const params = {
                            type: this.event.RESET,
                            data
                        }

                        /**
                         * Evento para cambiar contraseña.
                         *
                         * @event emitReset
                         * @property {object} params Objecto con tipo RESET a emitir.
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
        <reset-password-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import ResetPasswordMobile from './mobile'

        const event = {
            RESET: 'reset'
        }

        export default {
            components: { ResetPasswordMobile },
            data () { return { event } },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
