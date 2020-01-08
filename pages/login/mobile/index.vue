<template>
    <div id="page-login-mobile">
        <a-row>
            <h2>¡Bienvenido!</h2>
            <h2>Ingresa con tus datos.</h2>
        </a-row>

        <a-row type="flex" justify="center">
            <a-button>
                <nuxt-link to="/start">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>

        <a-row type="flex" justify="center">
            <a-input v-model="email" placeholder="Correo electrónico" type="email" />
            <a-input-password v-model="password" placeholder="Contraseña" />
            <a-button @click="login">
                Iniciar Sesión
            </a-button>
            <a-button type="link" @click="toRecoverPassword">
                ¿Olvidaste tu contraseña?
            </a-button>
        </a-row>
    </div>
</template>

<script>

    export default {
        name: 'LoginMobile',
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {

            login () {
                const params = {
                    type: this.event.LOGIN,
                    data: {
                        username: this.email,
                        password: this.password
                    }
                }

                this.$emit('emit', params)
            },
            toRecoverPassword () {
                const params = {
                    type: this.event.TO_RECOVER_PASSWORD
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
