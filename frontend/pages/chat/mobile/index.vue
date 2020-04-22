<template>
    <div id="page-chat-mobile">
        <header-title-chat-mobile :user-data="matchInfo" />

        <div class="background-chat">
            <div class="chat-content">
                <chat-message v-for="(msg, idx) in messagesList" :key="idx" :msg="msg" />
            </div>

            <chat-message-input @send="addMessage" />
        </div>
    </div>
</template>

<script>
    import HeaderTitleChatMobile from '@/components/headerTitleChatMobile'
    import ChatMessageInput from '@/components/chatMessageInput'
    import ChatMessage from '@/components/chatMessage'

    /**
     * Componente de la vista [Chat](#chat) para dispositivos móviles.
     */
    export default {
        name: 'ChatMobile',
        components: { HeaderTitleChatMobile, ChatMessageInput, ChatMessage },
        props: {
            /**
             * Evento a emitir hacia vista [Chat](#chat).
             *
             * @values ADD_MESSAGE
             */
            event: {
                type: Object,
                required: true
            },

            /**
             * Listado de mensajes del _chat_.
             */
            messagesList: {
                type: Array,
                required: true
            },

            /**
             * Información básica del _match_ para mostrar en el _chat_
             * (foto del perfil del rival, nombre del rival).
             */
            matchInfo: {
                required: true
            }
        },
        updated () {
            this.scrollToLastMessage()
        },
        methods: {
            /**
             * Emite evento para agregar o enviar mensaje.
             *
             * @param {object} event Evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
             */
            addMessage (message) {
                const params = {
                    type: this.event.ADD_MESSAGE,
                    userMessage: message
                }

                /**
                 * Evento para agregar o enviar mensaje.
                 *
                 * @event emitAddMessage
                 * @property {object} params Objecto con tipo ADD_MESSAGE a emitir
                 *                           y mensaje a guardar o enviar.
                 */
                this.$emit('emit', params)
                this.scrollToLastMessage()
            },

            /**
             * Desplaza la vista al último mensaje enviado.
             *
             * @public
             */
            scrollToLastMessage () {
                document.querySelector('.chat-content').scrollTo(0, document.querySelector('.chat-content').scrollHeight)
            }
        }
    }
</script>

<style scoped>

</style>

<docs>
    EXAMPLE

    ```html static
    <template>
        <chat-mobile :event="event" :messages-list="messagesList" :match-info="matchInfo" @emit="onEmit($event)" />
    </template>

    <script>
        import ChatMobile from './mobile'

        const event = {
            ADD_MESSAGE: 'add_message'
        }

        export default {
            components: { ChatMobile },
            data () {
                return {
                    event,
                    matchInfo: ... // Información del _match_
                }
            },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
