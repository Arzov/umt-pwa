<template>
    <div id="component-profile-image" :class="type">
        <nuxt-link :to="url">
            <div class="border">
                <div class="border-shadow">
                    <img :src="src">
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
    export default {
        name: 'ProfileImage',
        props: ['type', 'src', 'to'],
        computed: {
            url () {
                return this.to ? this.to : ''
            }
        }
    }
</script>
