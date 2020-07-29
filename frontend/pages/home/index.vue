<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <home-mobile :users-found="usersFound" :user-data="userData" :searching-users="searchingUsers" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import HomeMobile from './mobile'

    const event = {
        SEARCH_MATCH: 'search_match',
        REQUEST_MATCH: 'request_match'
    }

    export default {
        name: 'Home',
        layout: 'home',
        components: { HomeMobile },
        data () {
            return {
                event
            }
        },
        computed: {
            userData () {
                return this.$store.getters['user/userData']
            },

            usersFound () {
                return this.$store.getters['home/usersFound']
            },

            searchingUsers () {
                return this.$store.getters['home/searchingUsers']
            }
        },
        mounted () {
            this.$store.dispatch('home/searchMatch')
        },
        methods: {
            onEmit (event) {
                switch (event.type) {
                    // Buscar usuarios rivales cercanos
                    case this.event.SEARCH_MATCH:
                        this.$store.dispatch('home/searchMatch')
                        break
        
                    // Enviar solicitud de match
                    case this.event.REQUEST_MATCH:
                        this.$store.dispatch('home/requestMatch', event)

                        // Se elimina al rival solicitado del listado de rivales encontrados
                        this.usersFound.splice(event.index, 1)
                        break
                }
            }
        }
    }
</script>
