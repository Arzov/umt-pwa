<template>
    <div id="page-recover-password-mobile">
        <header-title-mobile to="/login" title="Recuperar Contraseña" />

        <div>
            <a-form :form="formRecover" @submit="recover($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.email.title">
                        <a-form-item :required="decorator.email.required" :extra="decorator.email.extra">
                            <a-input v-decorator="decorator.email.decorator" :placeholder="decorator.email.placeholder" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" class="row-margin-top">
                    <a-button u-button u-type="primary" u-size="large" html-type="submit" block>
                        Recuperar contraseña
                    </a-button>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import UInput from '@/components/uInput'
    import HeaderTitleMobile from '@/components/headerTitleMobile'

    export default {
        name: 'RecoverPasswordMobile',
        components: { UInput, HeaderTitleMobile },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRecover: this.$form.createForm(this)
            }
        },
        methods: {

            recover (event) {
                event.preventDefault()

                this.formRecover.validateFields((error, data) => {
                    if (!error) {
                        const params = {
                            type: this.event.RECOVER,
                            data
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
