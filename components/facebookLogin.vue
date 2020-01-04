<template>
    <a-button
        u-button
        u-type="secondary"
        u-size="large"
        block
        @click="toFacebookLogin"
    >
        <div>
            <img src="@/assets/images/SVG/facebook-icon.svg" alt="">
            <div>Iniciar con Facebook</div>
        </div>
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
