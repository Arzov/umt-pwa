<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <map-mobile :userData="userData" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import MapMobile from './mobile'

    export default {
        name: 'Map',
        components: { MapMobile },
        data () {
            return {
                event,
                userData: this.$store.getters['user/userData']
            }
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param  {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    case this.event.ADD_MESSAGE:
                        if (event.userMessage) {
                            // this.$store.dispatch('chat/addMessage', event)
                        }
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>
