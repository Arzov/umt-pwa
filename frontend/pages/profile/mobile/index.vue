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
                    <a-form-item :required="genderDecorator.required" :extra="genderDecorator.extra" u-form-custom-item>
                        <gender-input v-decorator="genderDecorator.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.match.required" :extra="decorator.match.extra" u-form-custom-item>
                        <match-filter-input v-decorator="decorator.match.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="genderFilterDecorator.required" :extra="genderFilterDecorator.extra" u-form-custom-item>
                        <gender-input v-decorator="genderFilterDecorator.decorator" title="busco rivales" options="genderOptionsFilter" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.age.required" :extra="decorator.age.extra" u-form-custom-item>
                        <age-filter-input v-decorator="decorator.age.decorator" />
                    </a-form-item>
                </a-row>

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
    import MatchFilterInput from '@/components/matchFilterInput'
    import AgeFilterInput from '@/components/ageFilterInput'

    /**
     * Componente de la vista [Profile](#profile) para dispositivos móviles.
     */
    export default {
        name: 'ProfileMobile',
        components: { ProfileImage, BirthdateInput, GenderInput, MatchFilterInput, AgeFilterInput },
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
                genderDecorator: decorator.gender(),
                genderFilterDecorator: decorator.gender('genderFilter')
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
                birthdate: this._birthdate,
                match: this.userData.matchFilter,
                genderFilter: this.userData.genderFilter,
                age: [this.userData.ageMinFilter, this.userData.ageMaxFilter]
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
                event.preventDefault()

                this.formProfile.validateFields((errors, values) => {
                    if (!errors) {
                        const params = {
                            type: this.event.SAVE_PROFILE,
                            gender: values.gender,
                            birthdate: values.birthdate,
                            genderFilter: values.genderFilter,
                            matchFilter: values.match,
                            ageFilter: values.age
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
                    }
                })
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
