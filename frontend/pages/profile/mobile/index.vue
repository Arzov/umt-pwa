<template>
    <div id="page-profile-mobile">
        <header-title-mobile to="/home" title="Perfil" />

        <div class="content">
            <a-row type="flex" justify="start" align="middle" class="profile-row">
                <profile-image :src="userData.picture" type="border-cold bkg-black" />
                <h3 class="user-name">
                    {{ userData.firstName }} {{ userData.lastName }}
                </h3>
            </a-row>

            <a-row type="flex" justify="center" u-input-row>
                <birthdate-input :value="birthdate" />
            </a-row>

            <a-row type="flex" justify="center" u-input-row>
                <gender-input :value="gender" />
            </a-row>

            <a-row type="flex" justify="center" u-input-row>
                <match-versus-select :value="matchFilter" />
            </a-row>

            <a-row type="flex" justify="center" u-input-row>
                <gender-filter-input :value="genderFilter" />
            </a-row>

            <a-row type="flex" justify="center" u-input-row>
                <age-filter-input v-model="ageFilter" />
            </a-row>

            <a-row type="flex" justify="center" class="save-button">
                <a-button u-button u-type="primary" block @click="saveProfile">
                    Guardar configuración
                </a-button>
            </a-row>

            <a-row type="flex" justify="center" class="close-button">
                <a u-anchor @click="logout">
                    <span u-a>Cerrar sesión</span>
                </a>
            </a-row>
        </div>
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'
    import GenderFilterInput from '@/components/genderFilterInput'
    import MatchVersusSelect from '@/components/matchVersusSelect'
    import AgeFilterInput from '@/components/ageFilterInput'

    export default {
        name: 'ProfileMobile',
        components: { ProfileImage, BirthdateInput, GenderInput, GenderFilterInput, MatchVersusSelect, AgeFilterInput },
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
