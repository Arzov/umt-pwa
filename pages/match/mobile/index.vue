<template>
    <div id="page-match-mobile">
        <div>
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="ACTIVOS">
                    <a-row v-if="activeMatches.length" type="flex" justify="center">
                        <ul>
                            <li v-for="(match, idx) in activeMatches" :key="idx">
                                <div @click="toChat(match, idx)">
                                    <a-avatar :src="match.adversaryPicture" size="large" />
                                    {{ match.adversaryName }}
                                </div>
                            </li>
                        </ul>
                    </a-row>
                    <a-row v-else type="flex" justify="center">
                        No hay solicitudes
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" tab="SOLICITUDES" force-render>
                    <a-row v-if="requestMatches.length" type="flex" justify="center">
                        <ul>
                            <li v-for="(match, idx) in requestMatches" :key="idx">
                                <div v-if="match.isCreator">
                                    <div v-if="match.matchStatus === 'P'">
                                        <a-avatar :src="match.adversaryPicture" size="large" />
                                        {{ match.adversaryName }}
                                        Solicitud enviada
                                        <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'C')">
                                            Cancelar
                                        </a-button>
                                    </div>
                                    <div v-else-if="match.matchStatus === 'D'">
                                        <a-avatar :src="match.adversaryPicture" size="large" />
                                        {{ match.adversaryName }}
                                        Solicitud rechazada
                                        <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'C')">
                                            Cancelar
                                        </a-button>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="match.matchStatus === 'P'">
                                        <a-avatar :src="match.adversaryPicture" size="large" />
                                        {{ match.adversaryName }}
                                        Aceptar solicitud
                                        <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'D')">
                                            Rechazar
                                        </a-button>
                                        <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'A')">
                                            Aceptar
                                        </a-button>
                                    </div>
                                    <div v-else-if="match.matchStatus === 'D'">
                                        <a-avatar :src="match.adversaryPicture" size="large" />
                                        {{ match.adversaryName }}
                                        Solicitud rechazada
                                        <a-button @click="updateMatch(match.hashKey, match.rangeKey, match.matchId, 'C')">
                                            Cancelar
                                        </a-button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </a-row>
                    <a-row v-else type="flex" justify="center">
                        No hay solicitudes
                    </a-row>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MatchMobile',
        props: {
            event: {
                required: true
            },
            activeMatches: {
                required: true
            },
            requestMatches: {
                required: true
            }
        },
        methods: {
            /**
             * Metodo que re-direcciona a la vista Chat.
             * @return {Object} Evento de tipo TO_CHAT.
             */
            toChat (match, idx) {
                const params = {
                    type: this.event.TO_CHAT,
                    match
                }
                this.$emit('emit', params)
            },
            /**
             * Metodo para actualizar el estado del match.
             * @return {Object} Evento de tipo UPDATE_MATCH.
             */
            updateMatch (hashKey, rangeKey, matchId, userStatus) {
                const params = {
                    type: this.event.UPDATE_MATCH,
                    hashKey,
                    rangeKey,
                    matchId,
                    userStatus
                }
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
