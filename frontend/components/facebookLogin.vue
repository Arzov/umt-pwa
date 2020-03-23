<template>
    <a-button
        u-button
        u-type="secondary"
        u-size="large"
        block
        @click="toFacebookLogin"
    >
        <span>
            <img src="@/assets/images/SVG/facebook-icon.svg" alt="">
            Iniciar con Facebook
        </span>
    </a-button>
</template>

<script>
    export default {
        name: 'FacebookLogin',
        methods: {
            /**
             * Autenticacion con Facebook.
             */
            toFacebookLogin () {
                this.$AWS.Auth.federatedSignIn({ provider: 'Facebook' })
            }
        }
    }
</script>

<style scoped>

</style>
