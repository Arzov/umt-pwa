<template>
  <div id="page-required-filters-mobile">
    <a-row type="flex" justify="center">
      <a-button @click="logout">
        Salir
      </a-button>
    </a-row>
    <a-row type="flex" justify="center">
      <a-radio-group name="radioGroup" :default-value="match" @change="getMatch">
        <a-radio v-for="match in matchOptions" :key="'m' + match.value" :value="match.value">
          {{ match.name }}
        </a-radio>
      </a-radio-group>
    </a-row>
    <a-row type="flex" justify="center">
      <a-radio-group name="radioGroup" :default-value="gender" @change="getGender">
        <a-radio v-for="gender in genderOptions" :key="'g' + gender.value" :value="gender.value">
          {{ gender.name }}
        </a-radio>
      </a-radio-group>
    </a-row>
    <a-row>
      <a-slider range :default-value="ageRange.default" :min="ageRange.min" :max="ageRange.max" @change="getAge" />
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="saveFilters">
        Continuar
      </a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'RequiredFiltersMobile',
  props: {
    event: {
      required: true
    },
    matchOptions: {
      required: true
    },
    genderOptions: {
      required: true
    },
    ageRange: {
      required: true
    }
  },
  data () {
    return {
      gender: false,
      match: false,
      age: this.ageRange.default
    }
  },
  methods: {
    /**
     * Metodo que obtiene el filtro de tipo de match seleccionado.
     * @param  {Object} option Opcion seleccionada por el usuario.
     */
    getMatch (option) {
      this.match = option.target.value
    },
    /**
     * Metodo que obtiene el filtro de sexo seleccionado.
     * @param  {Object} option Opcion seleccionada por el usuario.
     */
    getGender (option) {
      this.gender = option.target.value
    },
    /**
     * Metodo que obtiene el filtro de rango etario seleccionado.
     * @param  {number[]} value Rango de edad seleccionado.
     */
    getAge (value) {
      this.age = value
    },
    /**
     * Metodo guarda los filtros seleccionados.
     * @return {Object} Evento de tipo SAVE_FILTERS.
     */
    saveFilters () {
      const params = {
        type: this.event.SAVE_FILTERS,
        gender: this.gender,
        match: this.match,
        age: this.age
      }
      this.$emit('emit', params)
    },
    /**
     * Metodo para cerrar sesion.
     * @return {Object} Evento de tipo LOGOUT.
     */
    logout () {
      const params = {
        type: this.event.LOGOUT
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>

</style>
