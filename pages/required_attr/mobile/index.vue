<template>
  <div id="page-required-attr-mobile">
    <a-row>
      <a-row type="flex" justify="center">
        <a-button @click="logout">
          Salir
        </a-button>
      </a-row>
      <a-select placeholder="Día" style="width: 100px" @change="getBirthDay">
        <a-select-option v-for="day in days" :key="'d' + day" :value="day">
          {{ day }}
        </a-select-option>
      </a-select>
      <a-select placeholder="Mes" style="width: 100px" @change="getBirthMonth">
        <a-select-option v-for="month in months" :key="'m' + month.value" :value="month.value">
          {{ month.name }}
        </a-select-option>
      </a-select>
      <a-select placeholder="Año" style="width: 100px" @change="getBirthYear">
        <a-select-option v-for="year in years" :key="'y' + year" :value="year">
          {{ year }}
        </a-select-option>
      </a-select>
    </a-row>
    <a-row type="flex" justify="center">
      <a-radio-group name="radioGroup" :default-value="gender" @change="getGender">
        <a-radio v-for="gender in genders" :key="'g' + gender.value" :value="gender.value">
          {{ gender.name }}
        </a-radio>
      </a-radio-group>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="updateUser">
        Continuar
      </a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'RequiredAttrMobile',
  props: {
    events: {
      required: true
    },
    genders: {
      required: true
    },
    days: {
      required: true
    },
    months: {
      required: true
    },
    years: {
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
    getBirthDay (e) {
      this.birthDay = e
    },
    getBirthMonth (e) {
      this.birthMonth = e
    },
    getBirthYear (e) {
      this.birthYear = e
    },
    getGender (e) {
      this.gender = e.target.value
    },
    updateUser () {
      const params = {
        type: this.events.UPDATE_USER,
        gender: this.gender,
        birthDay: this.birthDay,
        birthMonth: this.birthMonth,
        birthYear: this.birthYear
      }
      this.$emit('emit', params)
    },
    logout () {
      const params = {
        type: this.events.LOGOUT
      }
      this.$emit('emit', params)
    }
  }
}
</script>

<style scoped>

</style>
