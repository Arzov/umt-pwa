<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <chat-mobile :event="event" :messages-list="messagesList" :matchInfo="matchInfo" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import moment from 'moment'
    import ChatMobile from './mobile'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{ADD_MESSAGE: string}}
     */
    const event = {
        ADD_MESSAGE: 'add_message'
    }

    export default {
        middleware ({ store, redirect }) {
            // Si se entra a la vista chat sin un matchId se devuelve a la pagina home
            if (!store.state.chat.matchInfo.matchId) {
                return redirect('/home')
            }
        },
        name: 'Chat',
        components: { ChatMobile },
        data () {
            return {
                event,
                matchInfo: this.$store.getters['chat/matchInfo']
            }
        },
        computed: {
            messagesList () {
                return this.$store.getters['chat/messagesList'].map((msg, idx) => {
                    return {
                        hashKey: msg.hashKey,
                        rangeKey: moment(msg.rangeKey.split('#')[0]).format().slice(11, 16),
                        author: msg.author,
                        authorName: msg.authorName,
                        content: msg.content
                    }
                })
            }
        },
        async mounted () {
            this.$store.dispatch('chat/getMessages')
            this.$store.dispatch('chat/onAddMessage')
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param  {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    case this.event.ADD_MESSAGE:
                        this.$store.dispatch('chat/addMessage', event)
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
