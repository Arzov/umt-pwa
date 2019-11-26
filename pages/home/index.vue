<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <home-mobile :get-distance="getDistance" :users-found="usersFound" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import HomeMobile from './mobile'
    import getDistance from '@/utils/functions'

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
        layout: 'app',
        components: { HomeMobile },
        data () {
            return {
                event,
                getDistance
            }
        },
        computed: {
            usersFound () {
                return this.$store.getters['home/usersFound']
            }
        },
        mounted () {
            this.$store.dispatch('home/searchMatch')
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
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>
