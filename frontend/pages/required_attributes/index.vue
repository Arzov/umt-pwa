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

    const event = {
        SAVE_ATTRIBUTES: 'save_attributes',
        SIGNOUT: 'signout'
    }

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
