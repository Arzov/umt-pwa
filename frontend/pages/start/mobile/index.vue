<template>
    <div id="page-start-mobile">
        <a-row type="flex" justify="center" align="top">
            <img src="./../../../assets/images/SVG/logo.svg" alt="">
        </a-row>

        <a-row type="flex" justify="center">
            <a-button u-button u-type="primary" block @click="toAuth(event.TO_LOGIN)">
                Iniciar sesión
            </a-button>

            <FacebookLogin />

            <GoogleLogin />

            <a u-anchor @click="toAuth(event.TO_REGISTER)">
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
                type: Object,
                required: true
            }
        },
        methods: {
            toAuth (eventType) {
                const params = {
                    type: eventType
                }

                this.$emit('emit', params)
            }
        }
    }
</script>
