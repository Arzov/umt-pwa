<template>
    <div id="page-match-mobile">
        <u-tabs :tabs="['ACTIVOS', 'SOLICITUDES']">
            <div>
                <div v-if="activeMatches.length">
                    <user-active-match-card v-for="(user, index) in activeMatches" :key="index" :user-data="user" :index="index" @click="toChat(user, index)" />
                </div>

                <a-row v-else type="flex" justify="center">
                    <h6>No hay solicitudes</h6>
                </a-row>
            </div>

            <div>
                <div v-if="requestMatches.length">
                    <user-request-match-card v-for="(user, index) in requestMatches" :key="index" :user-data="user" :index="index" />
                </div>

                <a-row v-else type="flex" justify="center">
                    No hay solicitudes
                </a-row>
            </div>
        </u-tabs>

        <a-tabs style="display: none" default-active-key="1" class="tabs">
            <a-tab-pane key="1" tab="ACTIVOS">
                <div />
            </a-tab-pane>

            <a-tab-pane key="2" tab="SOLICITUDES" force-render>
                <div>
                    <div v-if="requestMatches.length">
                        <user-request-match-card v-for="(user, index) in requestMatches" :key="index" :user-data="user" :index="index" />
                    </div>

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
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import UserActiveMatchCard from '@/components/userActiveMatchCard'
    import UserRequestMatchCard from '@/components/userRequestMatchCard'

    export default {
        name: 'MatchMobile',
        components: { UserActiveMatchCard, UserRequestMatchCard },
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
