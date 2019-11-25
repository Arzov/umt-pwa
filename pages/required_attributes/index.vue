<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <required-attributes-mobile
                :event="event"
                :gender-options="genderOptions"
                :day-options="dayOptions"
                :month-options="monthOptions"
                :year-options="yearOptions"
                @emit="onEmit($event)"
            />
        </mq-layout>
    </div>
</template>

<script>
    import RequiredAttributesMobile from './mobile'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{SAVE_ATTRIBUTES: string, LOGOUT: string}}
     */
    const event = {
        SAVE_ATTRIBUTES: 'save_attributes',
        LOGOUT: 'logout'
    }

    export default {
        name: 'RequiredAttributes',
        components: { RequiredAttributesMobile },
        data () {
            return {
                event,
                genderOptions: [
                    { name: 'Masculino', value: 'M' },
                    { name: 'Femenino', value: 'F' }
                ],
                monthOptions: [
                    { name: 'Enero', value: '01' },
                    { name: 'Febrero', value: '02' },
                    { name: 'Marzo', value: '03' },
                    { name: 'Abril', value: '04' },
                    { name: 'Mayo', value: '05' },
                    { name: 'Junio', value: '06' },
                    { name: 'Julio', value: '07' },
                    { name: 'Agosto', value: '08' },
                    { name: 'Septiembre', value: '09' },
                    { name: 'Octubre', value: '10' },
                    { name: 'Noviembre', value: '11' },
                    { name: 'Diciembre', value: '12' }
                ]
            }
        },
        computed: {
            dayOptions () {
                return Array.from({ length: 31 }, (value, index) => {
                    const d = 1 + index

                    if (d < 10) { return '0' + String(d) } else return String(d)
                })
            },
            yearOptions () {
                const year = new Date().getFullYear()
                return Array.from({ length: year - 1899 }, (value, index) => 1900 + index).reverse()
            }
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param  {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    // Guardar atributos seleccionados
                    case this.event.SAVE_ATTRIBUTES:
                        this.$store.dispatch('user/saveAttributes', event)
                        break

                    // Cerrar sesion
                    case this.event.LOGOUT:
                        this.$AWS.Auth.signOut({ global: true })
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
