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
     * Evento que pueden emitir los componentes.
     *
     * @type {{SEARCH_MATCH: string, REQUEST_MATCH: string}}
     */
    const event = {
        SEARCH_MATCH: 'search_match',
        REQUEST_MATCH: 'request_match'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También permite buscar rivales cercanos o enviar una solicitud de _match_ a un rival.
     *
     * @displayName HomeMain
     */
    export default {
        name: 'Home',
        layout: 'home',
        components: { HomeMobile },
        data () {
            return {
                event,
                usersFound: this.$store.getters['home/usersFound']
            }
        },
        methods: {
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede buscar rivales cercanos o enviar una
             * solicitud a un rival.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Buscar usuarios rivales cercanos
                    case this.event.SEARCH_MATCH:
                        this.$store.dispatch('home/searchMatch')
                        break
        
                    // Enviar solicitud de match
                    case this.event.REQUEST_MATCH:
                        this.$store.dispatch('home/requestMatch', event)

                        // Se elimina al rival solicitado del listado de rivales encontrados
                        this.usersFound.splice(event.index, 1)
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>
