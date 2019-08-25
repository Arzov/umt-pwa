<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <home-mobile />
    </mq-layout>
  </div>
</template>

<script>
import HomeMobile from './mobile'

export default {
  name: 'Home',
  components: { HomeMobile }
}
</script>

<style scoped>

</style>
