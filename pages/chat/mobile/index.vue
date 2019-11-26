<template>
    <div id="page-chat-mobile">
        <a-row type="flex" justify="center">
            <ul>
                <li v-for="(msg, idx) in messagesList" :key="idx">
                    {{ msg.content }}
                </li>
            </ul>
        </a-row>
        <a-row type="flex" justify="center">
            <form class="review-form" @submit.prevent="addMessage">
                <input v-model="userMessage" placeholder="mensaje">
                <input type="submit" value="Submit">
            </form>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: 'ChatMobile',
        props: {
            event: {
                required: true
            },
            messagesList: {
                required: true
            }
        },
        data () {
            return {
                userMessage: null
            }
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
