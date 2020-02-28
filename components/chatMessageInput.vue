<template>
    <div id="component-chat-message-input">
        <div class="bkg">
            <a-textarea placeholder="Escribe un mensaje" :autosize="{minRows: 1, maxRows: 5}" />

            <div class="send-icon-wrapper">
                <img src="./../assets/icons/send.svg">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChatMessageInput'
    }
</script>
