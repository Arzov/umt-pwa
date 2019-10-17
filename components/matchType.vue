<template>
  <div v-if="(!this.$store.state.user.matchType || this.$store.state.user.matchType === ' ') && !this.$store.state.geoloc.toggle">
    <a-radio-group name="radioGroup" :default-value="0" @change="getOption">
      <a-radio :value="0">
        5v5
      </a-radio>
      <a-radio :value="1">
        7v7
      </a-radio>
      <a-radio :value="2">
        11v11
      </a-radio>
    </a-radio-group>
    <a-button @click="updateOption">
      Guardar
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'MatchType',
  data () {
    return {
      option: '0'
    }
  },
  methods: {
    getOption (e) {
      this.option = e.target.value
    },
    updateOption () {
      const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
      const path = process.env.aws.LAMBDA_ARV_UMT_UPDATE_USER
      const option = ['5v5', '7v7', '11v11'][this.option]
      const params = {
        body: {
          hashKey: this.$store.state.user.geohash,
          rangeKey: this.$store.state.user.id,
          inMatch: this.$store.state.user.inMatch,
          searching: false,
          matchType: option
        }
      }

      this.$Amplify.API.post(apiName, path, params).then((response) => {
        this.$store.commit('user/setState', { key: 'matchType', value: option })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
