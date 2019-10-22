<template>
  <div id="page-required-filters-mobile">
    <a-row type="flex" justify="center">
        <a-button @click="logout">
          Salir
        </a-button>
      </a-row>
    <a-row type="flex" justify="center">
      <a-radio-group name="radioGroup" :default-value="match" @change="getMatch">
        <a-radio v-for="match in matches" :key="'m' + match.value" :value="match.value">
          {{ match.name }}
        </a-radio>
      </a-radio-group>
    </a-row>
    <a-row type="flex" justify="center">
      <a-radio-group name="radioGroup" :default-value="gender" @change="getGender">
        <a-radio v-for="gender in genders" :key="'g' + gender.value" :value="gender.value">
          {{ gender.name }}
        </a-radio>
      </a-radio-group>
    </a-row>
    <a-row>
      <a-slider range :defaultValue="ages.default" :min="ages.min" :max="ages.max" @change="getAge" />
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
  name: 'RequiredFiltersMobile',
  props: {
    events: {
      required: true
    },
    matches: {
      required: true
    },
    genders: {
      required: true
    },
    ages: {
      required: true
    }
  },
  data () {
    return {
      gender: false,
      match: false,
      age: this.ages.default
    }
  },
  methods: {
    getMatch (e) {
      this.match = e.target.value
    },
    getGender (e) {
      this.gender = e.target.value
    },
    getAge (value) {
      this.age = value
    },
    updateUser () {
      const params = {
        type: this.events.UPDATE_USER,
        gender: this.gender,
        match: this.match,
        age: this.age
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
