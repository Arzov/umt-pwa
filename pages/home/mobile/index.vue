<template>
  <div id="page-home-mobile">
    <a-row type="flex" justify="center" v-if="this.mapUsers.length">
      <a-card hoverable style="width: 240px">
        <img
          alt="example"
          :src="this.mapUsers[0].picture"
          slot="cover"
        />
        <a-card-meta :title="this.mapUsers[0].firstName + ' ' + this.mapUsers[0].age">
          <template slot="description">
            A {{ this.mapUsers[0].distance }} kilómetros de distancia
          </template>
        </a-card-meta>
      </a-card>
    </a-row>
    <a-row type="flex" justify="center" v-else>
      ¡No hay usuarios cercanos! Inténtalo más tarde.
      <a-button @click="searchMatch">
        Buscar
      </a-button>
    </a-row>
    <Geolocation />
  </div>
</template>

<script>
import Geolocation from '@/components/geoloc'

export default {
  name: 'HomeMobile',
  components: { Geolocation },
  props: {
    event: {
      required: true
    },
    usersFound: {
      required: true
    },
    getDistance: {
      required: true
    }
  },
  computed: {
    mapUsers () {
      return this.usersFound.map((user, idx) => {
        const userEdited = {
          hashKey: user.hashKey,
          firstName: user.firstName,
          age: user.age,
          picture: user.picture,
          distance: Math.round(this.getDistance(
            user.geoJson[1],
            user.geoJson[0],
            this.$store.getters['user/userData'].coordinates.latitude,
            this.$store.getters['user/userData'].coordinates.longitude
          ))
        }
        return userEdited
      })
    }
  },
  methods: {
    /**
     * Metodo que busca un encuentro con algun equipo rival.
     * @return {Object} Evento de tipo SEARCH_MATCH.
     */
    searchMatch () {
      const params = {
        type: this.event.SEARCH_MATCH
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>
</style>
