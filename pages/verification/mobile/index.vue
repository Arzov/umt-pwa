<template>
    <div id="page-verification-mobile">
        <a-row type="flex" justify="center">
            <a-button>
                <nuxt-link to="/start">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            Ingresa tu código de verificación
            {{ userData.id }}
            <a-input v-model="code" placeholder="Codigo verificacion" />
            <a-button @click="verify">
                Enviar
            </a-button>
            <a-button type="link" @click="resendCode">
                Reenviar código
            </a-button>
        </a-row>
    </div>
</template>

<script>

    export default {
        name: 'VerificationMobile',
        props: {
            event: {
                required: true
            },
            userData: {
                required: true
            }
        },
        data () {
            return {
                code: ''
            }
        },
        methods: {
            verify () {
                const params = {
                    type: this.event.VERIFY,
                    code: this.code
                }

                this.$emit('emit', params)
            },
            resendCode () {
                const params = {
                    type: this.event.RESEND_CODE
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
