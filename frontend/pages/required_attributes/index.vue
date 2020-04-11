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
     * Evento que pueden emitir los componentes.
     *
     * @type {{SAVE_ATTRIBUTES: string, LOGOUT: string}}
     */
    const event = {
        SAVE_ATTRIBUTES: 'save_attributes',
        SIGNOUT: 'signout'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También guardar atributos del usuario o cerrar sesión.
     *
     * @displayName RequiredAttributesMain
     */
    export default {
        name: 'RequiredAttributes',
        layout: 'auth',
        components: { RequiredAttributesMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede guardar los atributos del usuario
             * o cerrar sesión.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    // Guardar atributos seleccionados
                    case this.event.SAVE_ATTRIBUTES:
                        this.$store.dispatch('requiredAttributes/saveAttributes', event)
                            .then(() => {
                                this.$router.push(process.env.routes.home.path)
                            })
                            // TODO: falta implementar popup.
                            .catch(e => console.log(e))
                        break

                    // Cerrar sesion
                    case this.event.SIGNOUT:
                        this.$AWS.Auth.signOut({ global: true })
                        break
                }
            }
        }
    }
</script>

<style scoped>

</style>
