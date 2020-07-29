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

    const event = {
        TO_CHAT: 'to_chat',
        UPDATE_MATCH: 'update_match'
    }

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
            onEmit (event) {
                switch (event.type) {
                    // Redireccionar al chat del encuentro seleccionado
                    case this.event.TO_CHAT:
                        this.$store.dispatch('chat/setMatchInfo', { matchInfo: event.match })
                            .then(() => {
                                this.$router.push(process.env.routes.chat.path)
                            })
                            // TODO: falta implementar popup.
                            .catch(e => console.log(e))
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
