<template>
    <div id="page-required-attributes-mobile">
        <header-title-mobile title="Atributos Requeridos" />

        <div>
            <a-form :form="formRequired" @submit="saveAttributes($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.birthdate.required" :extra="decorator.birthdate.extra" u-form-custom-item>
                        <birthdate-input v-decorator="decorator.birthdate.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.gender.required" :extra="decorator.gender.extra" u-form-custom-item>
                        <gender-input v-decorator="decorator.gender.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Continuar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a u-anchor u-size="large" @click="signOut">
                        <span u-a>Cerrar sesión</span>
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'

    /**
     * Componente de la vista [RequiredAttributes](#required-attributes) para dispositivos móviles.
     */
    export default {
        name: 'RequiredAttributesMobile',
        components: { BirthdateInput, GenderInput },
        props: {
            /**
             * Evento a emitir hacia vista [RequiredAttributes](#required-attributes).
             *
             * @values SAVE_ATTRIBUTES, SIGNOUT
             */
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRequired: this.$form.createForm(this)
            }
        },
        methods: {
            /**
             * Emite evento para guardar atributos.
             *
             * @return {object} Evento de tipo SAVE_ATTRIBUTES.
             * @public
             */
            saveAttributes (event) {
                event.preventDefault()

                this.formRequired.validateFields((errors, values) => {
                    if (!errors) {
                        const params = {
                            type: this.event.SAVE_ATTRIBUTES,
                            ...values
                        }

                        /**
                         * Evento para guardar atributos.
                         *
                         * @event emitSaveAttributes
                         * @property {object} params Objecto con tipo SAVE_ATTRIBUTES a emitir y
                         *                           datos para guardar (fecha de nacimiento y sexo).
                         */
                        this.$emit('emit', params)
                    }
                })
            },

            /**
             * Emite evento para cerrar sesión.
             *
             * @return {object} Evento de tipo SIGNOUT.
             * @public
             */
            signOut () {
                const params = {
                    type: this.event.SIGNOUT
                }

                /**
                 * Evento para cerrar sesión.
                 *
                 * @event emitSignOut
                 * @property {object} params Objecto con tipo SIGNOUT a emitir.
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
        <required-attributes-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import RequiredAttributesMobile from './mobile'

        const event = {
            SAVE_ATTRIBUTES: 'save_attributes',
            SIGNOUT: 'signout'
        }

        export default {
            components: { RequiredAttributesMobile },
            data () {
                return {
                    event
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
