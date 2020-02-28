<template>
    <div id="page-chat-mobile">
        <header-title-chat-mobile :user-data="matchInfo" />

        <div class="chat-content">
            <chat-message />
            
            <chat-message />
        </div>

        <chat-message-input />

        <!-- <a-row type="flex" justify="center">
            <a-avatar :src="matchInfo.adversaryPicture" size="large" />
            {{ matchInfo.adversaryName }}
            <a-button>
                <nuxt-link to="/match">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            <ul>
                <li v-for="(msg, idx) in messagesList" :key="idx">
                    {{ msg.content }} {{ msg.rangeKey }}
                </li>
            </ul>
        </a-row>
        <a-row type="flex" justify="center">
            <form class="review-form" @submit.prevent="addMessage">
                <input v-model="userMessage" placeholder="mensaje">
                <input type="submit" value="Submit">
            </form>
        </a-row> -->
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
        data () {
            return {
                userMessage: null
            }
        },
        mounted () {
            console.log(this.matchInfo)
        },
        methods: {
            /**
             * Metodo agrega el mensaje del usuario.
             * @return {Object} Evento de tipo ADD_MESSAGE.
             */
            addMessage () {
                const params = {
                    type: this.event.ADD_MESSAGE,
                    userMessage: this.userMessage
                }
                this.userMessage = null
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
