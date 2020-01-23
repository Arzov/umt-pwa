<template>
    <div id="page-login-mobile">
        <div>
            <div>
                <nuxt-link to="/start">
                    <img src="./../../../assets/icons/arrow-left.svg" alt="" class="back-icon">
                </nuxt-link>
            </div>

            <a-row type="flex" justify="center" align="middle">
                <h6>Inicio de Sesión</h6>
            </a-row>

            <div class="border-bottom" />
        </div>
        
        <div>
            <a-form :form="formLogin" @submit="login">
                <a-row type="flex" justify="center" u-input-row>
                    <u-input title="correo electrónico">
                        <a-form-item :required="inputConfig.email.required" extra="Texto de prueba">
                            <a-input v-decorator="inputConfig.email.decorator" :placeholder="inputConfig.email.placeholder" type="email" />
                        </a-form-item>
                    </u-input>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <u-input title="contraseña">
                        <a-input-password v-model="password" placeholder="Ingresa tu contraseña" />
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
    import inputConfig from './../forms/login.json'
    import UInput from '@/components/UInput'

    export default {
        name: 'LoginMobile',
        components: { UInput },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                inputConfig,
                email: '',
                password: '',
                formLogin: this.$form.createForm(this)
            }
        },
        methods: {
            login () {
                const params = {
                    type: this.event.LOGIN,
                    data: {
                        username: this.email,
                        password: this.password
                    }
                }

                this.$emit('emit', params)
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
