<template>
    <div id="page-profile-mobile">
        <a-button>
            <nuxt-link to="/home">
                cancelar
            </nuxt-link>
        </a-button>
        <a-avatar slot="avatar" :src="this.userData.picture" />
        {{ this.userData.firstName }}
        <birthdate-input v-model="birthdate" />
        <gender-input v-model="gender" />
        <match-filter-input v-model="matchFilter" />
        <gender-filter-input v-model="genderFilter" />
        <age-filter-input v-model="ageFilter" />
        <a-row type="flex" justify="center">
            <a-button @click="saveProfile">
                Guardar
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            <a-button type="link" @click="logout">
                Cerrar sesión
            </a-button>
        </a-row>
    </div>
</template>

<script>
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'
    import GenderFilterInput from '@/components/genderFilterInput'
    import MatchFilterInput from '@/components/matchFilterInput'
    import AgeFilterInput from '@/components/ageFilterInput'

    export default {
        name: 'ProfileMobile',
        components: { BirthdateInput, GenderInput, GenderFilterInput, MatchFilterInput, AgeFilterInput },
        props: {
            event: {
                required: true
            },
            userData: {
                required: true
            }
        },
        data () {
            return {
                gender: this.userData.gender,
                birthdate: {
                    day: this.userData.birthdate.slice(8, 10),
                    month: this.userData.birthdate.slice(5, 7),
                    year: this.userData.birthdate.slice(0, 4)
                },
                genderFilter: this.userData.genderFilter,
                matchFilter: this.userData.matchFilter,
                ageFilter: [this.userData.ageMinFilter, this.userData.ageMaxFilter]
            }
        },
        methods: {
            /**
             * Metodo guarda los filtros seleccionados.
             * @return {Object} Evento de tipo SAVE_PROFILE.
             */
            saveProfile () {
                const params = {
                    type: this.event.SAVE_PROFILE,
                    data: {
                        gender: this.gender,
                        birthdate: this.birthdate,
                        genderFilter: this.genderFilter,
                        matchFilter: this.matchFilter,
                        ageFilter: this.ageFilter
                    }
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
