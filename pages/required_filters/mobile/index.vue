<template>
    <div id="page-required-filters-mobile">
        <a-row type="flex" justify="center">
            <a-button @click="logout">
                Salir
            </a-button>
        </a-row>
        <match-filter-input v-model="match" />
        <gender-filter-input v-model="gender" />
        <age-filter-input v-model="age" />
        <a-row type="flex" justify="center">
            <a-button @click="saveFilters">
                Continuar
            </a-button>
        </a-row>
    </div>
</template>

<script>
    import GenderFilterInput from '@/components/genderFilterInput'
    import MatchFilterInput from '@/components/matchFilterInput'
    import AgeFilterInput from '@/components/ageFilterInput'

    export default {
        name: 'RequiredFiltersMobile',
        components: { GenderFilterInput, MatchFilterInput, AgeFilterInput },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                gender: undefined,
                match: undefined,
                age: [18, 22]
            }
        },
        methods: {
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
