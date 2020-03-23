<template>
    <div id="component-footer-navbar">
        <div v-for="menu in navigation" :key="menu.id">
            <nuxt-link v-if="menu.enable.mobile" :to="menu.to">
                <img v-if="menu.id != current" :src="getImage(menu.icon.normal)" alt="">
                <img v-if="menu.id == current" :src="getImage(menu.icon.active)" alt="">
            </nuxt-link>
        </div>
    </div>
</template>

<script>
    import navigation from '@/static/navigation'

    export default {
        name: 'FooterNavbar',
        data () {
            return {
                navigation
            }
        },
        computed: {
            current () {
                return this.$store.state.navigation.name
            }
        },
        methods: {
            getImage (icon) {
                return require('@/assets/icons/' + icon)
            }
        }
    }
</script>
