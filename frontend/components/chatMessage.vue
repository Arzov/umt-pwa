<template>
    <div id="component-chat-message" :key="msg.key">
        <div class="message-wrapper" :type="type">
            <div class="text-wrapper">
                <div class="status-content">
                    <h6>{{ msg.rangeKey }}</h6>
                </div>
            
                <div class="text-content">
                    <p>{{ msg.content }}</p>
                </div>
            </div>

            <div class="footer">
                <img v-if="isAuthor" class="hot" src="./../assets/images/SVG/chat_corner_right.svg">
                <img v-else class="cold" src="./../assets/images/SVG/chat_corner_left.svg">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChatMessage',
        props: {
            msg: {
                required: true
            }
        },
        data () {
            return {
                isAuthor: true,
                type: 'hot'
            }
        },
        mounted () {
            if (this.$store.state.user.email.toLowerCase() !== this.msg.author.toLowerCase()) {
                this.isAuthor = false
                this.type = 'cold'
            }
        }
    }
</script>
