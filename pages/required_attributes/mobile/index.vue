<template>
    <div id="page-required-attributes-mobile">
        <a-row>
            <a-row type="flex" justify="center">
                <a-button @click="logout">
                    Salir
                </a-button>
            </a-row>
            <birthdate-input v-model="birthdate" />
            <gender-input v-model="gender" />
        </a-row>
        <a-row type="flex" justify="center">
            <a-button @click="saveAttributes">
                Continuar
            </a-button>
        </a-row>
    </div>
</template>

<script>
    import BirthdateInput from '@/components/birthdateInput'
    import GenderInput from '@/components/genderInput'

    export default {
        name: 'RequiredAttributesMobile',
        components: { BirthdateInput, GenderInput },
        props: {
            event: {
                required: true
            }
        },
        data () {
            return {
                birthdate: undefined,
                gender: undefined
            }
        },
        methods: {
            /**
             * Metodo guarda los atributos seleccionados.
             * @return {Object} Evento de tipo SAVE_ATTRIBUTES.
             */
            saveAttributes () {
                const params = {
                    type: this.event.SAVE_ATTRIBUTES,
                    birthdate: this.birthdate,
                    gender: this.gender
                }
                this.$emit('emit', params)
            },
            /**
             * Metodo para cerrar sesion.
             * @return {Object} Evento de tipo LOGOUT.
             */
            logout () {
                const params = {
                    type: this.event.LOGOUT
                }
                this.$emit('emit', params)
            }
        }
    }
</script>

<style scoped>

</style>
