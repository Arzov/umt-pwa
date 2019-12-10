<template>
    <div id="page-register-mobile">
        <a-row type="flex" justify="center">
            <a-button>
                <nuxt-link to="/start">
                    cancelar
                </nuxt-link>
            </a-button>
        </a-row>
        <a-row type="flex" justify="center">
            <a-input v-model="name" placeholder="Nombre" />
            <a-input v-model="email" placeholder="Correo electrónico" type="email" />
            <a-input-password v-model="password" placeholder="Contraseña" />
            <birthdate-input v-model="birthdate" />
            <gender-input v-model="gender" />
            <a-row type="flex" justify="center">
                <a-button @click="register">
                    Registrar
                </a-button>
                <a-button type="link">
                    Terminos y Condiciones
                </a-button>
            </a-row>
        </a-row>
    </div>
</template>

<script>
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'

    export default {
        name: 'RegisterMobile',
        components: { BirthdateInput, GenderInput },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                name: undefined,
                email: undefined,
                password: undefined,
                birthdate: undefined,
                gender: undefined
            }
        },
        methods: {
            register () {
                const params = {
                    type: this.event.REGISTER,
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        birthdate: this.birthdate,
                        gender: this.gender
                    }
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
