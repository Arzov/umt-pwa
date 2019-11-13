<template>
  <div>
    <mq-layout :mq="['mobile', 'tablet']">
      <home-mobile :events="event" @emit="onEmit($event)" />
    </mq-layout>
  </div>
</template>

<script>
import HomeMobile from './mobile'

/**
 * Evento que pueden emitir las vistas.
 * @type {{TO_MATCH: string, FIND_MATCH: string}}
 */
const event = {
  TO_MATCH: 'to_match',
  FIND_MATCH: 'find_match'
}

export default {
  name: 'Home',
  layout: 'app',
  components: { HomeMobile },
  data () {
    return {
      event
    }
  },
  methods: {
    /**
     * Captura eventos generados por las vistas.
     * @param  {Object} event Evento emitido por la vista.
     */
    onEmit (event) {
      switch (event.type) {
        case this.event.TO_MATCH:
          this.$router.push(process.env.routes.match.path)
          break

        case this.event.FIND_MATCH:
          // Buscar rival
          const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
          let path = process.env.aws.LAMBDA_ARV_UMT_SEARCH_MATCH
          let params = {
            body: {
              hashKey: this.$store.state.user.geohash,
              rangeKey: this.$store.state.user.id,
              matchType: this.$store.state.user.matchType,
              name: this.$store.state.user.firstName
            }
          }

          this.$Amplify.API.post(apiName, path, params)
            .then((response) => {
              console.log('1 Buscar')
              console.log(response)

              switch (response.status) {
                case 'SEARCHING_MATCH':
                  // Agregar match
                  path = process.env.aws.LAMBDA_ARV_UMT_ADD_MATCH
                  params = {
                    body: {
                      hashKey: this.$store.state.user.geohash,
                      rangeKey: this.$store.state.user.id,
                      matchType: this.$store.state.user.matchType
                    }
                  }

                  this.$Amplify.API.post(apiName, path, params)
                    .then((response) => {
                      console.log('2 Agregar')
                      console.log(response)

                      // Actualizar estado del usuario inMatch = true
                      path = process.env.aws.LAMBDA_ARV_UMT_UPDATE_USER
                      params = {
                        body: {
                          hashKey: this.$store.state.user.geohash,
                          rangeKey: this.$store.state.user.id,
                          matchType: this.$store.state.user.matchType,
                          searching: false,
                          inMatch: true
                        }
                      }

                      this.$Amplify.API.post(apiName, path, params)
                        .then((response) => {
                          this.$store.commit('user/setState', {
                            key: 'inMatch',
                            value: true
                          })
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                  break

                default:
                  console.log('Error desconocido.')
                  break
              }
            })
            .catch((error) => {
              console.log(error)
            })
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
