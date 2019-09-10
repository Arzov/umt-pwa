<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center">
      hola
      <a-avatar :src="this.$store.state.user.picture" size="large" />
      {{ this.$store.state.user.id }}
    </a-row>
    <a-button @click="toMatches">
      Matches
    </a-button>
    <a-button @click="findMatch">
      Encontrar partida
    </a-button>
    <a-button @click="logOut">
      Cerrar
    </a-button>
    <Geolocation />
    <MatchType />
  </div>
</template>

<script>
import Geolocation from '@/components/geoloc'
import MatchType from '@/components/matchType'

export default {
  name: 'HomeMobile',
  components: { Geolocation, MatchType },
  data () {
    return {
      lastKey: null
    }
  },
  methods: {
    toMatches () {
      this.$router.push({
        name: process.env.routes.match.name
      })
    },
    findMatch () {
      // Actualizar estado del usuario a searching = true
      const apiName = process.env.aws.APIGATEWAY_UMATCH_NAME
      let path = process.env.aws.LAMBDA_ARV_UMT_UPDATE_USER
      let params = {
        body: {
          hashKey: this.$store.state.user.geohash,
          rangeKey: this.$store.state.user.id,
          matchType: this.$store.state.user.matchType,
          searching: true,
          inMatch: this.$store.state.user.inMatch
        }
      }

      this.$Amplify.API.post(apiName, path, params).then((response) => {
        console.log('1 update')
        console.log(response)
        // Buscar rival
        path = process.env.aws.LAMBDA_ARV_UMT_SEARCH_MATCH
        params = {
          body: {
            hashKey: this.$store.state.user.geohash,
            rangeKey: this.$store.state.user.id,
            matchType: this.$store.state.user.matchType,
            lastKey: this.lastKey
          }
        }

        this.$Amplify.API.post(apiName, path, params).then((response) => {
          console.log('2 Buscar match')
          console.log(response)
          this.lastKey = JSON.stringify(response.data.LastEvaluatedKey)

          switch (response.status) {
            case 'NO_MATCHES':
              console.log('No hemos encontrado rival, intentalo mas tarde!')

              // Actualizar estado searching = false
              path = process.env.aws.LAMBDA_ARV_UMT_UPDATE_USER
              params = {
                body: {
                  hashKey: this.$store.state.user.geohash,
                  rangeKey: this.$store.state.user.id,
                  matchType: this.$store.state.user.matchType,
                  searching: false,
                  inMatch: this.$store.state.user.inMatch
                }
              }

              this.lastKey = null // Resetear lastKey de la query

              this.$Amplify.API.post(apiName, path, params).catch((error) => {
                console.log(error)
              })
              break

            case 'MATCH_FOUND':
              // Si el usuario encontrado es el mismo, entonces seguir con la busqueda
              if (response.data.Items[0].rangeKey.S === this.$store.state.user.id) {
                this.findMatch()

              // Se encontro un match
              } else {
                const invitedUser = response.data.Items[0].rangeKey.S

                // Agregar match en DynamoDB
                path = process.env.aws.LAMBDA_ARV_UMT_ADD_MATCH
                params = {
                  body: {
                    hashKey: this.$store.state.user.id,
                    rangeKey: invitedUser,
                    name: this.$store.state.user.firstName
                  }
                }

                this.lastKey = null // Resetear lastKey de la query

                this.$Amplify.API.post(apiName, path, params).then((response) => {
                  console.log('3 agregar')
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

                  this.$Amplify.API.post(apiName, path, params).then((response) => {
                    console.log('4 update')
                    console.log(response)
                    this.$store.commit('user/setState', { key: 'inMatch', value: true })
                  }).catch((error) => {
                    console.log(error)
                  })
                }).catch((error) => {
                  console.log(error)
                })
              }
              break

            case 'ALREADY_MATCHED':
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

              this.$Amplify.API.post(apiName, path, params).then((response) => {
                console.log('4 update')
                console.log(response)
                this.$store.commit('user/setState', { key: 'inMatch', value: true })
              }).catch((error) => {
                console.log(error)
              })
              break

            default:
              console.log('Error desconocido.')
              break
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    logOut () {
      this.$Amplify.Auth.signOut({ global: true })
        .then((data) => {
          this.$store.commit('user/resetStates')
          console.log(data)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
