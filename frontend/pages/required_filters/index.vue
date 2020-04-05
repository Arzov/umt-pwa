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
     * Evento que pueden emitir los componentes.
     *
     * @type {{SAVE_FILTERS: string, SIGNOUT: string}}
     */
    const event = {
        SAVE_FILTERS: 'save_filters',
        SIGNOUT: 'signout'
    }

    /**
     * Vista principal que decide cual componente inicializar (mobile o desktop).
     * También guardar filtros del usuario o cerrar sesión.
     *
     * @displayName RequiredFiltersMain
     */
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
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede guardar los filtros del usuario
             * o cerrar sesión.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Guardar filtros seleccionados
                    case this.event.SAVE_FILTERS:
                        this.$store.dispatch('requiredFilters/saveFilters', event)
                            .then((result) => {
                                this.$router.push(process.env.routes.home.path)
                            })
                            .catch(e => console.log(e))
                        break

                    // Cerrar sesion
                    case this.event.SIGNOUT:
                        this.$AWS.Auth.signOut({ global: true })
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
