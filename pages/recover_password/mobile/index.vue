<template>
    <div id="page-recover-password-mobile">
        <a-row type="flex" justify="center">
            <a-button>
                <nuxt-link to="/login">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            <a-input v-model="email" placeholder="Correo electrónico" type="email" />
            <a-button @click="recover">
                Recuperar contraseña
            </a-button>
        </a-row>
    </div>
</template>

<script>

    export default {
        name: 'RecoverPasswordMobile',
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                email: ''
            }
        },
        methods: {

            recover () {
                const params = {
                    type: this.event.RECOVER,
                    data: {
                        username: this.email
                    }
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
