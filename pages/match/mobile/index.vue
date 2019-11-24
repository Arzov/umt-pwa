<template>
    <div id="page-match-mobile">
        <a-row type="flex" justify="center">
            <ul>
                <li v-for="(match, idx) in mapMatches" :key="idx" @click="toChat(match, idx)">
                    {{ match.invitedName }}
                </li>
            </ul>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: 'MatchMobile',
        props: {
            event: {
                required: true
            },
            mapMatches: {
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
            }
        }
    }
</script>

<style scoped>

</style>
