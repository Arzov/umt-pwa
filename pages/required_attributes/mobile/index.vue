<template>
  <div id="page-required-attributes-mobile">
    <a-row>
      <a-row type="flex" justify="center">
        <a-button @click="logout">
          Salir
        </a-button>
      </a-row>
      <a-select placeholder="Día" style="width: 100px" @change="getBirthDay">
        <a-select-option v-for="day in dayOptions" :key="'d' + day" :value="day">
          {{ day }}
        </a-select-option>
      </a-select>
      <a-select placeholder="Mes" style="width: 100px" @change="getBirthMonth">
        <a-select-option v-for="month in monthOptions" :key="'m' + month.value" :value="month.value">
          {{ month.name }}
        </a-select-option>
      </a-select>
      <a-select placeholder="Año" style="width: 100px" @change="getBirthYear">
        <a-select-option v-for="year in yearOptions" :key="'y' + year" :value="year">
          {{ year }}
        </a-select-option>
      </a-select>
    </a-row>
    <a-row type="flex" justify="center">
      <a-radio-group name="radioGroup" :default-value="gender" @change="getGender">
        <a-radio v-for="gender in genderOptions" :key="'g' + gender.value" :value="gender.value">
          {{ gender.name }}
        </a-radio>
      </a-radio-group>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="saveAttributes">
        Continuar
      </a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'RequiredAttributesMobile',
  props: {
    event: {
      required: true
    },
    genderOptions: {
      required: true
    },
    dayOptions: {
      required: true
    },
    monthOptions: {
      required: true
    },
    yearOptions: {
      required: true
    }
  },
  data () {
    return {
      gender: false,
      birthDay: false,
      birthMonth: false,
      birthYear: false
    }
  },
  methods: {
    /**
     * Metodo que obtiene el dia de nacimiento del usuario.
     * @param  {Object} option Opcion seleccionada por el usuario.
     */
    getBirthDay (option) {
      this.birthDay = option
    },
    /**
     * Metodo que obtiene el mes de nacimiento del usuario.
     * @param  {Object} option Opcion seleccionada por el usuario.
     */
    getBirthMonth (option) {
      this.birthMonth = option
    },
    /**
     * Metodo que obtiene el año de nacimiento del usuario.
     * @param  {Object} option Opcion seleccionada por el usuario.
     */
    getBirthYear (option) {
      this.birthYear = option
    },
    /**
     * Metodo que obtiene el sexo del usuario.
     * @param  {Object} option Opcion seleccionada por el usuario.
     */
    getGender (option) {
      this.gender = option.target.value
    },
    /**
     * Metodo guarda los atributos seleccionados.
     * @return {Object} Evento de tipo SAVE_ATTRIBUTES.
     */
    saveAttributes () {
      const params = {
        type: this.event.SAVE_ATTRIBUTES,
        gender: this.gender,
        birthDay: this.birthDay,
        birthMonth: this.birthMonth,
        birthYear: this.birthYear
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
