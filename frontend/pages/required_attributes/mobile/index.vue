<template>
    <div id="page-required-attributes-mobile">
        <header-title-mobile title="Atributos Requeridos" />

        <div>
            <a-form :form="formRequired" @submit="saveAttributes($event)">
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

                <a-row type="flex" justify="center" u-button-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Continuar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a u-anchor u-size="large" @click="signOut">
                        <span u-a>Cerrar sesión</span>
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'

    export default {
        name: 'RequiredAttributesMobile',
        components: { BirthdateInput, GenderInput },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRequired: this.$form.createForm(this),
                genderDecorator: decorator.gender()
            }
        },
        methods: {
            saveAttributes (event) {
                event.preventDefault()

                this.formRequired.validateFields((errors, values) => {
                    if (!errors) {
                        const params = {
                            type: this.event.SAVE_ATTRIBUTES,
                            ...values
                        }
                        this.$emit('emit', params)
                    }
                })
            },
            signOut () {
                const params = {
                    type: this.event.SIGNOUT
                }
                this.$emit('emit', params)
            }
        }
    }
</script>
