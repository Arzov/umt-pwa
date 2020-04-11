<template>
    <div id="page-required-filters-mobile">
        <a-row type="flex" justify="center">
            <a-button @click="signOut">
                Salir
            </a-button>
        </a-row>
        <match-filter-input v-model="match" />
        <gender-input v-model="gender" />
        <age-filter-input v-model="age" />
        <a-row type="flex" justify="center">
            <a-button @click="saveFilters">
                Continuar
            </a-button>
        </a-row>
    </div>
</template>

<script>
    import GenderInput from '@/components/GenderInput'
    import MatchFilterInput from '@/components/matchFilterInput'
    import AgeFilterInput from '@/components/ageFilterInput'

    /**
     * Componente de la vista [RequiredFiltersMobile](#required-filters) para dispositivos móviles.
     */
    export default {
        name: 'RequiredFiltersMobile',
        components: { GenderInput, MatchFilterInput, AgeFilterInput },
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
                gender: undefined,
                match: undefined,
                age: [18, 22]
            }
        },
        methods: {
            /**
             * Emite evento para guardar filtros.
             *
             * @return {object} Evento de tipo SAVE_FILTERS.
             * @public
             */
            saveFilters () {
                const params = {
                    type: this.event.SAVE_FILTERS,
                    gender: this.gender,
                    match: this.match,
                    age: this.age
                }

                /**
                 * Evento para guardar filtros.
                 *
                 * @event emitSaveFilters
                 * @property {object} params Objecto con tipo SAVE_FILTERS a emitir y
                 *                           datos para guardar (tipo de juego, sexo y rango de edad).
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
