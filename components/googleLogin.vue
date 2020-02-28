<template>
    <a-button u-button u-type="secondary" u-size="large" block @click="toGoogleLogin">
        <span>
            <img src="@/assets/images/SVG/google-icon.svg" alt="">
            Iniciar con Google
        </span>
    </a-button>
</template>

<script>
    export default {
        name: 'GoogleLogin',
        methods: {
            /**
             * Autenticacion con Google.
             */
            toGoogleLogin () {
                this.$AWS.Auth.federatedSignIn({ provider: 'Google' })
            }
        }
    }
</script>

<style scoped>

</style>
