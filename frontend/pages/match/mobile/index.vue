<template>
    <div id="page-match-mobile">
        <u-tabs :tabs="['ACTIVOS', 'SOLICITUDES']">
            <div>
                <div v-if="activeMatches.length">
                    <user-active-match-card v-for="(match, index) in activeMatches" :key="index" :user-data="match" :index="index" @click="toChat(match)" />
                </div>

                <a-row v-else type="flex" justify="center">
                    <h6>No hay encuentros activos</h6>
                </a-row>
            </div>

            <div>
                <div v-if="requestMatches.length">
                    <user-request-match-card v-for="(match, index) in requestMatches" :key="index" :user-data="match" :index="index" @submit="updateMatch" />
                </div>

                <a-row v-else type="flex" justify="center">
                    <h6>No hay solicitudes</h6>
                </a-row>
            </div>
        </u-tabs>
    </div>
</template>

<script>
    import UserActiveMatchCard from '@/components/userActiveMatchCard'
    import UserRequestMatchCard from '@/components/userRequestMatchCard'

    /**
     * Componente de la vista [Match](#match) para dispositivos móviles.
     */
    export default {
        name: 'MatchMobile',
        components: { UserActiveMatchCard, UserRequestMatchCard },
        props: {
            /**
             * Evento a emitir hacia vista [Match](#match).
             *
             * @values TO_CHAT, UPDATE_MATCH
             */
            event: {
                type: Object,
                required: true
            },

            /**
             * Listado de solicitudes activas de rivales.
             */
            activeMatches: {
                type: Array[Object],
                required: true
            },

            /**
             * Listado de solicitudes pendientes de rivales.
             */
            requestMatches: {
                type: Array[Object],
                required: true
            }
        },
        methods: {
            /**
             * Emite evento para redireccionar a la vista [Chat](#chat).
             *
             * @param {object} match Información del _match_.
             * @return {object} Evento a gatillar.
             * @public
             */
            toChat (match) {
                const params = {
                    type: this.event.TO_CHAT,
                    match
                }

                /**
                 * Evento para redireccionar a la vista [Chat](#chat).
                 *
                 * @event emitToChat
                 * @property {object} params Objecto con tipo TO_CHAT a emitir y datos
                 *                           del _match_ (nombre del rival, listado de mensajes y
                 *                           último mensaje obtenido desde servidor).
                 */
                this.$emit('emit', params)
            },

            /**
             * Emite evento para actualizar solicitud.
             *
             * @param {string} hashKey Email del usuario.
             * @param {string} rangeKey Email del rival.
             * @param {string} matchId Id del _match_.
             * @param {string} userStatus Estado del _match_ a actualizar.
             * @return {object} Evento a gatillar.
             * @public
             */
            updateMatch ({ hashKey, rangeKey, matchId, userStatus }) {
                const params = {
                    type: this.event.UPDATE_MATCH,
                    hashKey,
                    rangeKey,
                    matchId,
                    userStatus
                }

                /**
                 * Evento para actualizar solicitud.
                 *
                 * @event emitUpdateMatch
                 * @property {object} params Objecto con tipo UPDATE_MATCH a emitir y datos
                 *                           para actualizar la solicitud (email del usuario,
                 *                           email del rival, id del _match_ y estado del _match_).
                 */
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
