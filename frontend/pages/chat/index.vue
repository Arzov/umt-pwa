<template>
    <div>
        <mq-layout :mq="['mobile', 'tablet']">
            <chat-mobile :event="event" :messages-list="messagesList" :match-info="matchInfo" @emit="onEmit($event)" />
        </mq-layout>
    </div>
</template>

<script>
    import moment from 'moment'
    import ChatMobile from './mobile'

    moment.updateLocale('en', {
        calendar: {
            sameDay: '[Today] HH:mm',
            nextDay: 'DD/MM/YYYY HH:mm',
            nextWeek: 'DD/MM/YYYY HH:mm',
            lastDay: '[Yesterday] HH:mm',
            lastWeek: 'DD/MM/YYYY HH:mm',
            sameElse: 'DD/MM/YYYY HH:mm'
        }
    })
    moment.updateLocale('es', {
        calendar: {
            sameDay: '[Hoy] HH:mm',
            nextDay: 'DD/MM/YYYY HH:mm',
            nextWeek: 'DD/MM/YYYY HH:mm',
            lastDay: '[Ayer] HH:mm',
            lastWeek: 'DD/MM/YYYY HH:mm',
            sameElse: 'DD/MM/YYYY HH:mm'
        }
    })
    moment.locale('es')

    /**
     * Evento que pueden emitir los componentes.
     *
     * @type {{ADD_MESSAGE: string}}
     */
    const event = {
        ADD_MESSAGE: 'add_message'
    }

    /**
     * Vista principal que decide cual componente inicializar _mobile_ o _desktop_.
     * También gatillar el evento para agregar un mensaje en el _chat_.
     *
     * @displayName ChatMain
     */
    export default {
        middleware ({ store, redirect }) {
            // Si se entra a la vista chat sin un matchId se devuelve a la pagina home
            if (!store.state.chat.matchInfo) {
                return redirect('/home')
            }
        },
        name: 'Chat',
        layout: 'empty',
        components: { ChatMobile },
        data () {
            return {
                event,
                matchInfo: this.$store.getters['chat/matchInfo']
            }
        },
        computed: {
            messagesList () {
                let messages = this.$store.getters['chat/messagesList'].map((msg, idx) => {
                    return {
                        hashKey: msg.hashKey,
                        rangeKey: moment(msg.rangeKey.split('#')[0]).calendar(),
                        key: msg.rangeKey,
                        author: msg.author,
                        authorName: msg.authorName,
                        content: msg.content
                    }
                })

                return this.removeDups(messages)
            }
        },
        async mounted () {
            await this.$store.dispatch('chat/fetchMessages')
            await this.$store.dispatch('chat/onAddMessage')
        },
        methods: {
            /**
             * Captura eventos generados por los componentes. Según
             * los valores retornados puede agregar un mensaje al _chat_.
             *
             * @param {object} event Evento emitido por el componente.
             * @public
             */
            onEmit (event) {
                switch (event.type) {
                    case this.event.ADD_MESSAGE:
                        if (event.userMessage) {
                            this.$store.dispatch('chat/addMessage', event)
                        }
                        break
                }
            },

            /**
             * Elimina mensajes duplicados.
             *
             * @param {Array} messages Arreglo de mensajes que llegan desde el servidor.
             */
            removeDups (messages) {
                let unique = []

                messages.forEach(function (i) {
                    let exists = unique.findIndex((msg) => {
                        return msg.key === i.key
                    })

                    if (exists === -1)
                        unique.push(i)
                })

                return unique
            }
        }
    }
</script>

<style scoped>

</style>
