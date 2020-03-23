<template>
    <div v-show="loading" id="component-u-spin">
        <h6>Cargando...</h6>
    </div>
</template>

<script>
    export default {
        name: 'USpin',
        computed: {
            loading () {
                return this.$store.state.spin.loading
            }
        }
    }
</script>
