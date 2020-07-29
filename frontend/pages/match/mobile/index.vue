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

    export default {
        name: 'MatchMobile',
        components: { UserActiveMatchCard, UserRequestMatchCard },
        props: {
            event: {
                type: Object,
                required: true
            },
            activeMatches: {
                type: Array[Object],
                required: true
            },
            requestMatches: {
                type: Array[Object],
                required: true
            }
        },
        methods: {
            toChat (match) {
                const params = {
                    type: this.event.TO_CHAT,
                    match
                }
                this.$emit('emit', params)
            },
            updateMatch ({ hashKey, rangeKey, matchId, userStatus }) {
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
