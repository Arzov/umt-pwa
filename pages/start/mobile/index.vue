<template>
    <div id="page-start-mobile">
        <a-row type="flex" justify="center" align="top">
            <img src="./../../../assets/images/SVG/umatch_logo.svg" alt="">
        </a-row>

        <a-row type="flex" justify="center">
            <a-button u-button u-type="primary" block @click="toLogin">
                Iniciar sesión
            </a-button>

            <FacebookLogin />

            <GoogleLogin />

            <a u-anchor @click="toRegister">
                ¿No tienes cuenta? <span u-a>Regístrate.</span>
            </a>
        </a-row>

        <a-row type="flex" justify="center">
            <img src="./../../../assets/images/SVG/arzov_logo_wordmark_mono_white.svg" alt="">
        </a-row>
    </div>
</template>

<script>
    import FacebookLogin from '@/components/facebookLogin'
    import GoogleLogin from '@/components/googleLogin'

    export default {
        name: 'StartMobile',
        components: { FacebookLogin, GoogleLogin },
        props: {
            event: {
                required: true
            }
        },
        methods: {
            /**
             * Metodo que re-direcciona a la vista Login.
             * @return {Object} Evento de tipo TO_LOGIN.
             */
            toLogin () {
                const params = {
                    type: this.event.TO_LOGIN
                }
                this.$emit('emit', params)
            },
            /**
             * Metodo que re-direcciona a la vista Register.
             * @return {Object} Evento de tipo TO_REGISTER.
             */
            toRegister () {
                const params = {
                    type: this.event.TO_REGISTER
                }
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
