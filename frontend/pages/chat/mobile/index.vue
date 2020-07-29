<template>
    <div id="page-chat-mobile">
        <header-title-chat-mobile :user-data="matchInfo" />

        <div class="background-chat">
            <div class="chat-content">
                <div>
                    <div>
                        <chat-message v-for="(msg, idx) in messagesList" :key="idx" :msg="msg" />
                    </div>
                </div>
            </div>

            <chat-message-input @send="sendMessage" />
        </div>
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
                type: Object,
                required: true
            },
            messagesList: {
                type: Array,
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
            sendMessage (message) {
                const params = {
                    type: this.event.SEND_MESSAGE,
                    userMessage: message
                }
                this.$emit('emit', params)
                this.scrollToLastMessage()
            },
            scrollToLastMessage () {
                document.querySelector('.chat-content')
                    .scrollTo(-10, document.querySelector('.chat-content').scrollHeight)
            }
        }
    }
</script>
