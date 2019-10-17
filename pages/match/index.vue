<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <match-mobile />
    </mq-layout>
  </div>
</template>

<script>
import MatchMobile from './mobile'

export default {
  name: 'Match',
  components: { MatchMobile }
}
</script>

<style scoped>

</style>
