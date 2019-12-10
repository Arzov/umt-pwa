<template>
    <div id="page-verification-mobile">
        <a-row type="flex" justify="center">
            Ingresa tu código de verificación
            {{ userData.id }}
            <a-input v-model="code" placeholder="Codigo verificacion" />
            <a-button @click="verify">
                Enviar
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
            }
        }
    }
</script>

<style scoped>

</style>
