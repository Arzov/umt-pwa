<template>
    <div id="page-chat-mobile">
        <header-title-chat-mobile :user-data="matchInfo" />

        <div class="chat-content">
            <chat-message v-for="(msg, idx) in messagesList" :key="idx" :msg="msg" />
        </div>

        <chat-message-input @send="addMessage" />
    </div>
</template>

<script>
    import HeaderTitleChatMobile from '@/components/headerTitleChatMobile'
    import ChatMessageInput from '@/components/chatMessageInput'
    import ChatMessage from '@/components/chatMessage'

    export default {
        name: 'ChatMobile',
        components: { HeaderTitleChatMobile, ChatMessageInput, ChatMessage },
        props: {
            event: {
                required: true
            },
            messagesList: {
                required: true
            },
            matchInfo: {
                required: true
            }
        },
        updated () {
            this.scrollToLastMessage()
        },
        methods: {
            /**
             * Metodo agrega el mensaje del usuario.
             * @return {Object} Evento de tipo ADD_MESSAGE.
             */
            addMessage (message) {
                const params = {
                    type: this.event.ADD_MESSAGE,
                    userMessage: message
                }

                this.$emit('emit', params)
                this.scrollToLastMessage()
            },

            scrollToLastMessage () {
                document.querySelector('.chat-content').scrollTo(0, document.querySelector('.chat-content').scrollHeight)
            }
        }
    }
</script>

<style scoped>

</style>
