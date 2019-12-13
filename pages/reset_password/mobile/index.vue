<template>
    <div id="page-reset-password-mobile">
        <a-row type="flex" justify="center">
            <a-button>
                <nuxt-link to="/login">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            <a-input v-model="code" placeholder="Código" />
            <a-input-password v-model="newPassword" placeholder="Contraseña nueva" />
            <a-button @click="reset">
                Recuperar contraseña
            </a-button>
        </a-row>
    </div>
</template>

<script>

    export default {
        name: 'ResetPasswordMobile',
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                code: '',
                newPassword: ''
            }
        },
        methods: {

            reset () {
                const params = {
                    type: this.event.RESET,
                    data: {
                        code: this.code,
                        password: this.newPassword
                    }
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
