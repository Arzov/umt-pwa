<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <home-mobile :users-found="usersFound" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import HomeMobile from './mobile'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{SEARCH_MATCH: string, ADD_MATCH: string}}
     */
    const event = {
        SEARCH_MATCH: 'search_match',
        ADD_MATCH: 'add_match'
    }

    export default {
        name: 'Home',
        components: { HomeMobile },
        data () {
            return {
                event,
                usersFound: this.$store.getters['home/usersFound']
            }
        },
        mounted () {
            this.$store.dispatch('home/searchMatch')

            // Refrescar listado de usuarios cuando se haga una busqueda
            this.$store.watch(
                (state, getters) => getters['home/usersFound'],
                (newValue, oldValue) => {
                    this.usersFound = newValue
                }
            )
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    // Buscar usuarios rivales cercanos
                    case this.event.SEARCH_MATCH:
                        this.$store.dispatch('home/searchMatch')
                        break
        
                    // Enviar solicitud de match
                    case this.event.ADD_MATCH:
                        this.$store.dispatch('home/addMatch', event)
                        this.usersFound.splice(event.index, 1)
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>
