<template>
    <div id="page-register-mobile">
        <header-title-mobile to="/start" title="Registrar" />

        <div>
            <a-form :form="formRegister" @submit="register($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.name.title">
                        <a-form-item :required="decorator.name.required" :extra="decorator.name.extra">
                            <a-input v-decorator="decorator.name.decorator" :placeholder="decorator.name.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.email.title">
                        <a-form-item :required="decorator.email.required" :extra="decorator.email.extra">
                            <a-input v-decorator="decorator.email.decorator" :placeholder="decorator.email.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.password.title">
                        <a-form-item :required="decorator.password.required" :extra="decorator.password.extra">
                            <a-input-password v-decorator="decorator.password.decorator" :placeholder="decorator.password.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.birthdate.required" :extra="decorator.birthdate.extra" u-form-custom-item>
                        <birthdate-input v-decorator="decorator.birthdate.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <gender-input v-model="gender" />
                </a-row>

                <a-row type="flex" justify="center" class="row-margin-top">
                    <a-button u-button u-type="primary" u-size="large" html-type="submit" block>
                        Registrar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" class="row-margin-top">
                    <a u-anchor u-size="large">
                        Términos y condiciones
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import UInput from '@/components/uInput'
    import HeaderTitleMobile from '@/components/headerTitleMobile'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'

    export default {
        name: 'RegisterMobile',
        components: { BirthdateInput, GenderInput, UInput, HeaderTitleMobile },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRegister: this.$form.createForm(this),
                gender: 'M'
            }
        },
        methods: {
            register (event) {
                event.preventDefault()

                this.formRegister.validateFields((error, data) => {
                    if (!error) {
                        const params = {
                            type: this.event.REGISTER,
                            data: {
                                ...data,
                                gender: this.gender
                            }
                        }

                        this.$emit('emit', params)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
