<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <chat-mobile />
    </mq-layout>
  </div>
</template>

<script>
import ChatMobile from './mobile'

export default {
  name: 'Chat',
  components: { ChatMobile }
}
</script>

<style scoped>

</style>
