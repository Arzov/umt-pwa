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
                    <user-request-match-card v-for="(user, index) in requestMatches" :key="index" :user-data="user" :index="index" @submit="updateMatch" />
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
            updateMatch ({ hashKey, rangeKey, matchId, userStatus }) {
                console.log(userStatus)
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
