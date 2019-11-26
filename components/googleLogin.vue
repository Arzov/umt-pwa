<template>
    <div>
        <a-button @click="toGoogleLogin">
            Iniciar con Google
        </a-button>
    </div>
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
