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

            <a-form :form="formProfile" @submit="saveProfile($event)">

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.birthdate.required" :extra="decorator.birthdate.extra" u-form-custom-item>
                        <birthdate-input v-decorator="decorator.birthdate.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.gender.required" :extra="decorator.gender.extra" u-form-custom-item>
                        <gender-input v-decorator="decorator.gender.decorator" />
                    </a-form-item>
                </a-row>

                <!-- <a-row type="flex" justify="center" u-input-row>
                    <match-versus-select :value="matchFilter" />
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <gender-input :value="genderFilter" />
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <age-filter-input v-model="ageFilter" />
                </a-row> -->

                <a-row type="flex" justify="center" class="save-button">
                    <a-button u-button u-type="primary" block html-type="submit">
                        Guardar configuración
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" class="close-button">
                    <a u-anchor @click="signOut">
                        <span u-a>Cerrar sesión</span>
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import ProfileImage from '@/components/profileImage'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'
    import MatchVersusSelect from '@/components/matchVersusSelect'
    import AgeFilterInput from '@/components/ageFilterInput'

    /**
     * Componente de la vista [Profile](#profile) para dispositivos móviles.
     */
    export default {
        name: 'ProfileMobile',
        components: { ProfileImage, BirthdateInput, GenderInput, MatchVersusSelect, AgeFilterInput },
        props: {
            /**
             * Evento a emitir hacia vista [Profile](#profile).
             *
             * @values SAVE_PROFILE, SIGNOUT
             */
            event: {
                type: Object,
                required: true
            },

            /**
             * Datos del usuario.
             */
            userData: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formProfile: this.$form.createForm(this),
                genderFilter: this.userData.genderFilter,
                matchFilter: this.userData.matchFilter,
                ageFilter: [this.userData.ageMinFilter, this.userData.ageMaxFilter]
            }
        },
        computed: {
            _birthdate () {
                return {
                    day: this.userData.birthdate.slice(8, 10),
                    month: this.userData.birthdate.slice(5, 7),
                    year: this.userData.birthdate.slice(0, 4)
                }
            }
        },
        mounted () {
            this.formProfile.setFieldsValue({
                gender: this.userData.gender,
                birthdate: this._birthdate
            })
        },
        methods: {
            /**
             * Emite evento para guardar los datos del usuario.
             *
             * @param {string} eventType Tipo de evento a gatillar.
             * @return {object} Evento a gatillar.
             * @public
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

                /**
                 * Evento para guardar los datos del usuario.
                 *
                 * @event emitSaveProfile
                 * @property {object} params Objecto con tipo SAVE_PROFILE a emitir y datos
                 *                           a guardar (sexo, fecha de nacimiento, filtro de sexo,
                 *                           tipo de juego y rango de edad de búsqueda).
                 */
                this.$emit('emit', params)
            },

            /**
             * Metodo para cerrar sesion.
             *
             * @return {Object} Evento de tipo SIGNOUT.
             * @public
             */
            signOut () {
                const params = {
                    type: this.event.SIGNOUT
                }

                /**
                 * Evento para guardar los datos del usuario.
                 *
                 * @event emitSignOut
                 * @property {object} params Objecto con tipo SIGNOUT a emitir.
                 */
                this.$emit('emit', params)
            }
        }
    }
</script>

<docs>
    EXAMPLE

    ```html static
    <template>
        <profile-mobile :user-data="userData" :event="event" @emit="onEmit($event)" />
    </template>

    <script>
        import ProfileMobile from './mobile'

        const event = {
            SAVE_PROFILE: 'save_profile',
            SIGNOUT: 'signout'
        }

        export default {
            components: { ProfileMobile },
            data () {
                return {
                    event,
                    userData: ... // Datos del usuario
                }
            },
            methods: {
                onEmit (event) { ... }
            },
            ...
        }
    </script>
    ```
</docs>
