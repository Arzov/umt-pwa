<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <required-filters-mobile :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import RequiredFiltersMobile from './mobile'

    const event = {
        SAVE_FILTERS: 'save_filters',
        SIGNOUT: 'signout'
    }

    export default {
        name: 'RequiredFilters',
        layout: 'auth',
        components: { RequiredFiltersMobile },
        data () {
            return {
                event
            }
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    // Guardar filtros seleccionados
                    case this.event.SAVE_FILTERS:
                        this.$store.dispatch('requiredFilters/saveFilters', event)
                            .then(() => {
                                this.$router.push(process.env.routes.home.path)
                            })
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
