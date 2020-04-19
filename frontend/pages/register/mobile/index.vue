<template>
    <div id="page-register-mobile">
        <header-title-mobile to="/start" title="Registrar" />

        <div>
            <a-form :form="formRegister" @submit="signUp($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.name.title">
                        <a-form-item :required="decorator.name.required" :extra="decorator.name.extra">
                            <a-input v-decorator="decorator.name.decorator" :placeholder="decorator.name.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

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

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.birthdate.required" :extra="decorator.birthdate.extra" u-form-custom-item>
                        <birthdate-input v-decorator="decorator.birthdate.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="genderDecorator.required" :extra="genderDecorator.extra" u-form-custom-item>
                        <gender-input v-decorator="genderDecorator.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Registrar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a u-anchor u-size="large">
                        Términos y condiciones
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import UInput from '@/components/uInput'
    import HeaderTitleMobile from '@/components/headerTitleMobile'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'

    /**
     * Componente de la vista [Register](#register) para dispositivos móviles.
     */
    export default {
        name: 'RegisterMobile',
        components: { BirthdateInput, GenderInput, UInput, HeaderTitleMobile },
        props: {
            /**
             * Evento a emitir hacia vista [Register](#register).
             *
             * @values SIGNUP, TO_TERMS
             */
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRegister: this.$form.createForm(this),
                genderDecorator: decorator.gender()
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
            signUp (event) {
                event.preventDefault()

                this.formRegister.validateFields((error, values) => {
                    if (!error) {
                        const params = {
                            type: this.event.SIGNUP,
                            ...values
                        }

                        /**
                         * Evento para registrar email.
                         *
                         * @event emitSignUp
                         * @property {object} params Objecto con tipo SIGNUP a emitir y
                         *                           datos para registro (email, nombre,
                         *                           contraseña, sexo y fecha de nacimiento).
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
        <register-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import RegisterMobile from './mobile'

        const event = {
            SIGNUP: 'sigup',
            TO_TERMS: 'to_terms'
        }

        export default {
            components: { RegisterMobile },
            data () { return { event } },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
