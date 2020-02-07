<template>
    <div id="page-login-mobile">
        <header-title-mobile to="/start" title="Inicio de Sesión" />
        
        <div>
            <a-form :form="formLogin" @submit="login($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input :title="decorator.username.title">
                        <a-form-item :required="decorator.username.required" :extra="decorator.username.extra">
                            <a-input v-decorator="decorator.username.decorator" :placeholder="decorator.username.placeholder" />
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

                <a-row type="flex" justify="center" class="row-margin-top">
                    <a-button u-button u-type="primary" u-size="large" html-type="submit" block>
                        Iniciar Sesión
                    </a-button>
                </a-row>
            </a-form>

            <a-row type="flex" justify="center" class="row-margin-top">
                <a u-anchor u-size="large" @click="toRecoverPassword">
                    ¿Olvidaste tu contraseña? <span u-a>Recupérala.</span>
                </a>
            </a-row>
        </div>
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import UInput from '@/components/uInput'
    import HeaderTitleMobile from '@/components/headerTitleMobile'

    export default {
        name: 'LoginMobile',
        components: { UInput, HeaderTitleMobile },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                decorator,
                formLogin: this.$form.createForm(this)
            }
        },
        methods: {
            login (event) {
                event.preventDefault()

                this.formLogin.validateFields((error, data) => {
                    if (!error) {
                        const params = {
                            type: this.event.LOGIN,
                            data
                        }

                        this.$emit('emit', params)
                    }
                })
            },

            toRecoverPassword () {
                const params = {
                    type: this.event.TO_RECOVER_PASSWORD
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
