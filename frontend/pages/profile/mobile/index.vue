<template>
    <div id="page-profile-mobile">
        <header-title-mobile to="/home" title="Perfil" />

        <div class="content">
            <a-row type="flex" justify="start" align="middle" class="profile-row">
                <!-- TODO: Dejar avatar en un componente -->
                <div>
                    <vue-avatar
                        ref="vueavatar"
                        :image="userData.picture"
                        :width="100"
                        :height="100"
                        :border="10"
                        :border-radius="200"
                        :rotation="parseFloat(rotation)"
                        :scale="parseFloat(scale)"
                        @vue-avatar-editor:image-ready="onImageReady"
                    />
                    <br>
                    <input
                        v-model="scale"
                        type="range"
                        min="1"
                        max="3"
                        step="0.02"
                    >
                    <button @click="rotate" />
                    <br>
                    <button @click="uploadPhoto">
                        Subir foto
                    </button>
                </div>
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
    import { VueAvatar } from 'vue-avatar-editor-improved'
    import decorator from '@/static/decorator'
    import ProfileImage from '@/components/profileImage'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'
    import MatchFilterInput from '@/components/matchFilterInput'
    import AgeFilterInput from '@/components/ageFilterInput'

    export default {
        name: 'ProfileMobile',
        components: { VueAvatar, ProfileImage, BirthdateInput, GenderInput, MatchFilterInput, AgeFilterInput },
        props: {
            event: {
                type: Object,
                required: true
            },
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
                genderFilterDecorator: decorator.gender('genderFilter'),
                rotation: 0,
                scale: 1
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
                        this.$emit('emit', params)
                    }
                })
            },
            uploadPhoto (event) {
                const params = {
                    file: this.$refs.vueavatar.getImageScaled().toDataURL(),
                    type: this.event.UPLOAD_PHOTO
                }
                this.$emit('emit', params)
            },
            signOut () {
                const params = {
                    type: this.event.SIGNOUT
                }
                this.$emit('emit', params)
            },
            onImageReady: function onImageReady () {
                this.scale = 1
                this.rotation = 0
            },
            rotate () {
                // Evitar suma grandes numeros si el usuario aprieta muchas veces
                if (this.rotation == 270) this.rotation = 0
                else this.rotation += 90
            }
        }
    }
</script>
