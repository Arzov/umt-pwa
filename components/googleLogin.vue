<template>
    <a-button u-button u-type="secondary" u-size="large" block @click="toGoogleLogin">
        <div>
            <img src="@/assets/images/SVG/google-icon.svg" alt="">
            <div>Iniciar con Google</div>
        </div>
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
