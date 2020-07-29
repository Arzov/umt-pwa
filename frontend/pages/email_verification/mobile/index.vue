<template>
    <div id="page-email-verification-mobile">
        <header-title-mobile to="/start" title="verificar" />
        <div>
            <a-form :form="formVerification" @submit="verify($event)">
                <a-row type="flex" justify="center">
                    <h6>Ingresa tu código de verificación</h6>
                </a-row>

                <a-row type="flex" justify="center">
                    <h6 class="email">
                        {{ email }}
                    </h6>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.code.required" :extra="decorator.code.extra" u-form-custom-item>
                        <code-input v-decorator="decorator.code.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Enviar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a u-anchor u-size="large" @click="resendCode">
                        <span u-a>Reenviar código</span>
                    </a>
                </a-row>
            </a-form>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import CodeInput from '@/components/codeInput'

    export default {
        name: 'EmailVerificationMobile',
        components: { CodeInput },
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
                formVerification: this.$form.createForm(this)
            }
        },
        computed: {
            email () {
                return this.userData.email
            }
        },
        methods: {
            verify (event) {
                event.preventDefault()

                this.formVerification.validateFields((error, values) => {
                    if (!error) {
                        const params = {
                            type: this.event.VERIFY,
                            ...values
                        }

                        this.$emit('emit', params)
                    }
                })
            },
            resendCode () {
                const params = {
                    type: this.event.RESEND_CODE
                }
                this.$emit('emit', params)
            }
        }
    }
</script>
