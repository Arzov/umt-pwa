<template>
    <div id="layout-default">
        <mq-layout :mq="['mobile', 'tablet']">
            <header-title-mobile :title="title" :to="to" />
            <nuxt />
            <footer-navbar />
        </mq-layout>
    </div>
</template>

<script>
    export default {
        computed: {
            title () {
                return this.$store.state.navigation.title
            },
            
            to () {
                return this.$store.state.navigation.toUrl
            }
        }
    }
</script>
