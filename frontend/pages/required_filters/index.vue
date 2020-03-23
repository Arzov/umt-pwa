<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <required-filters-mobile :event="event" @emit="onEmit($event)" />
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
                event
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
