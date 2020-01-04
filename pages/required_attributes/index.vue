<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <required-attributes-mobile
                :event="event"
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
                event
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
