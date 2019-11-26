<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <required-filters-mobile
                :event="event"
                :match-options="matchOptions"
                :gender-options="genderOptions"
                :age-range="ageRange"
                @emit="onEmit($event)"
            />
        </mq-layout>
    </div>
</template>

<script>
    import RequiredFiltersMobile from './mobile'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{SAVE_FILTERS: string, LOGOUT: string}}
     */
    const event = {
        SAVE_FILTERS: 'save_filters',
        LOGOUT: 'logout'
    }

    export default {
        name: 'RequiredFilters',
        components: { RequiredFiltersMobile },
        data () {
            return {
                event,
                matchOptions: [
                    { name: '5v5', value: '5v5' },
                    { name: '7v7', value: '7v7' },
                    { name: '11v11', value: '11v11' }
                ],
                genderOptions: [
                    { name: 'Hombres', value: 'M' },
                    { name: 'Mujeres', value: 'F' }
                ],
                ageRange: {
                    min: 18,
                    max: 60,
                    default: [18, 22]
                }
            }
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param  {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    // Guardar filtros seleccionados
                    case this.event.SAVE_FILTERS:
                        this.$store.dispatch('user/saveFilters', event)
                        break

                    // Cerrar sesion
                    case this.event.LOGOUT:
                        this.$AWS.Auth.signOut({ global: true })
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
