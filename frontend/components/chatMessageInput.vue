<template>
    <div id="component-chat-message-input">
        <div class="bkg">
            <a-textarea v-model="msg" placeholder="Escribe un mensaje" :autosize="{minRows: 1, maxRows: 5}" />

            <div class="send-icon-wrapper" @click="onClick">
                <img src="./../assets/icons/send.svg">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChatMessageInput',
        data () {
            return {
                msg: ''
            }
        },
        methods: {
            onClick () {
                if (this.msg !== '') {
                    this.$emit('send', this.msg.replace(/^\s+|\s+$/g, ''))
                    this.msg = ''
                }
            }
        }
    }
</script>
