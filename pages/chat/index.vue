<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <chat-mobile :event="event" :messages-list="messagesList" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import ChatMobile from './mobile'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{ADD_MESSAGE: string}}
     */
    const event = {
        ADD_MESSAGE: 'add_message'
    }

    export default {
        name: 'Chat',
        components: { ChatMobile },
        data () {
            return {
                event
            }
        },
        computed: {
            messagesList () {
                return this.$store.getters['chat/messagesList']
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
