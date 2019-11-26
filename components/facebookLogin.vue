<template>
    <div>
        <a-button @click="toFacebookLogin">
            Iniciar con Facebook
        </a-button>
    </div>
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
