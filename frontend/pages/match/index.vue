<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <match-mobile
                :event="event"
                :active-matches="activeMatches"
                :request-matches="requestMatches"
                @emit="onEmit($event)"
            />
        </mq-layout>
    </div>
</template>

<script>
    import MatchMobile from './mobile'

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{TO_CHAT: string, UPDATE_MATCH: string}}
     */
    const event = {
        TO_CHAT: 'to_chat',
        UPDATE_MATCH: 'update_match'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También enviar a la vista [Chat](#chat) o actualizar una solicitud.
     *
     * @displayName MatchMain
     */
    export default {
        name: 'Match',
        components: { MatchMobile },
        data () {
            return {
                event
            }
        },
        computed: {
            // Listado de encuentros activos
            activeMatches () {
                return this.$store.getters['match/matchesList'].map((match, idx) => {
                    if (match.matchStatus === 'A') {
                        return match
                    }
                }).filter((el) => {
                    return el != null
                })
            },
            // Solicitudes pendientes
            requestMatches () {
                return this.$store.getters['match/matchesList'].map((match, idx) => {
                    if (match.matchStatus !== 'A') {
                        return match
                    }
                }).filter((el) => {
                    return el != null
                })
            }
        },
        async mounted () {
            this.$store.commit('navigation/setTitle', 'Encuentros')
            this.$store.commit('navigation/setUrl', '')
            this.$store.dispatch('match/fetchMatches')
            this.$store.dispatch('match/onUpdateMatch')
        },
        methods: {
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede enviar a la vista [Chat](#chat)
             * o actualizar una solicitud.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Redireccionar al chat del encuentro seleccionado
                    case this.event.TO_CHAT:
                        this.$store.dispatch('chat/setMatchInfo', { matchInfo: event.match })
                        this.$router.push(process.env.routes.chat.path)
                        break
        
                    // Actualizar el estado del match
                    case this.event.UPDATE_MATCH:
                        this.$store.dispatch('match/updateMatch', event)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
