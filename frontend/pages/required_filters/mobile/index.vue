<template>
    <div id="page-required-filters-mobile">
        <header-title-mobile title="Filtros Requeridos" />

        <div>
            <a-form :form="formRequire" @submit="saveFilters($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.match.required" :extra="decorator.match.extra" u-form-custom-item>
                        <match-versus-select v-decorator="decorator.match.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.gender.required" :extra="decorator.gender.extra" u-form-custom-item>
                        <gender-input v-decorator="decorator.gender.decorator" title="busco rivales" options="genderOptionsFilter" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.age.required" :extra="decorator.age.extra" u-form-custom-item>
                        <age-filter-input v-decorator="decorator.age.decorator" />
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
    import GenderInput from '@/components/GenderInput'
    import MatchVersusSelect from '@/components/MatchVersusSelect'
    import AgeFilterInput from '@/components/ageFilterInput'

    /**
     * Componente de la vista [RequiredFiltersMobile](#required-filters) para dispositivos móviles.
     */
    export default {
        name: 'RequiredFiltersMobile',
        components: { GenderInput, MatchVersusSelect, AgeFilterInput },
        props: {
            /**
             * Evento a emitir hacia vista [RequiredFiltersMobile](#required-filters).
             *
             * @values SAVE_FILTERS, SIGNOUT
             */
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRequire: this.$form.createForm(this)
            }
        },
        methods: {
            /**
             * Emite evento para guardar filtros.
             *
             * @return {object} Evento de tipo SAVE_FILTERS.
             * @public
             */
            saveFilters (event) {
                event.preventDefault()

                this.formRequire.validateFields((errors, values) => {
                    if (!errors) {
                        const params = {
                            type: this.event.SAVE_FILTERS,
                            genderFilter: values.gender,
                            matchFilter: values.match,
                            ageFilter: values.age
                        }

                        /**
                         * Evento para guardar filtros.
                         *
                         * @event emitSaveFilters
                         * @property {object} params Objecto con tipo SAVE_FILTERS a emitir y
                         *                           datos para guardar (tipo de juego, sexo y rango de edad).
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
        <required-filters-mobile :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import RequiredFiltersMobile from './mobile'

        const event = {
            SAVE_FILTERS: 'save_filters',
            SIGNOUT: 'signout'
        }

        export default {
            components: { RequiredFiltersMobile },
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
