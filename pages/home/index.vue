<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <home-mobile :users-found="usersFoundMap" :event="event" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import HomeMobile from './mobile'
    import getDistance from '@/utils/getDistance'

    /**
     * Evento que pueden emitir las vistas.
     * @type {{SEARCH_MATCH: string, ADD_MATCH: string}}
     */
    const event = {
        SEARCH_MATCH: 'search_match',
        ADD_MATCH: 'add_match'
    }

    export default {
        name: 'Home',
        layout: 'app',
        components: { HomeMobile },
        data () {
            return {
                event,
                usersFound: this.$store.getters['home/usersFound']
            }
        },
        computed: {
            usersFoundMap () {
                return this.usersFound.map((user, idx) => {
                    const userEdited = {
                        hashKey: user.hashKey,
                        firstName: user.firstName,
                        age: user.age,
                        picture: user.picture,
                        distance: Math.round(getDistance(
                            user.geoJson[1],
                            user.geoJson[0],
                            this.$store.getters['user/userData'].coordinates.latitude,
                            this.$store.getters['user/userData'].coordinates.longitude
                        ))
                    }
                    return userEdited
                })
            }
        },
        mounted () {
            this.$store.dispatch('home/searchMatch')
        },
        methods: {
            /**
             * Captura eventos generados por las vistas.
             * @param {Object} event Evento emitido por la vista.
             */
            onEmit (event) {
                switch (event.type) {
                    // Buscar usuarios rivales cercanos
                    case this.event.SEARCH_MATCH:
                        this.$store.dispatch('home/searchMatch')
                        break
        
                    // Enviar solicitud de match
                    case this.event.ADD_MATCH:
                        this.$store.dispatch('home/addMatch', event)
                        this.usersFound.splice(event.index, 1)
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>
