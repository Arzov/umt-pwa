<template>
  <a-row type="flex" justify="center">
    <b>INICIO</b>
    <a-button>
      <nuxt-link to="/profile">
        perfil
      </nuxt-link>
    </a-button>
  </a-row>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
