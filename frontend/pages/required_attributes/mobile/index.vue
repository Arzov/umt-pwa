<template>
    <div id="page-required-attributes-mobile">
        <a-row>
            <a-row type="flex" justify="center">
                <a-button @click="signOut">
                    Salir
                </a-button>
            </a-row>
            <birthdate-input v-model="birthdate" />
            <gender-input v-model="gender" />
        </a-row>
        <a-row type="flex" justify="center">
            <a-button @click="saveAttributes">
                Continuar
            </a-button>
        </a-row>
    </div>
</template>

<script>
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
                birthdate: {
                    day: undefined,
                    month: undefined,
                    year: undefined
                },
                gender: undefined
            }
        },
        methods: {
            /**
             * Emite evento para guardar atributos.
             *
             * @return {object} Evento de tipo SAVE_ATTRIBUTES.
             * @public
             */
            saveAttributes () {
                const params = {
                    type: this.event.SAVE_ATTRIBUTES,
                    birthdate: this.birthdate,
                    gender: this.gender
                }

                /**
                 * Evento para guardar atributos.
                 *
                 * @event emitSaveAttributes
                 * @property {object} params Objecto con tipo SAVE_ATTRIBUTES a emitir y
                 *                           datos para guardar (fecha de nacimiento y sexo).
                 */
                this.$emit('emit', params)
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
