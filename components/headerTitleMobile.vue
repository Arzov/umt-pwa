<template>
    <div id="component-header-title-mobile">
        <div v-if="to != ''">
            <nuxt-link :to="to">
                <img src="./../assets/icons/arrow-left.svg" alt="" class="back-icon">
            </nuxt-link>
        </div>
        <div v-else class="shadow-icon" />

        <a-row type="flex" justify="center" align="middle">
            <div>
                <h6>{{ title }}</h6>
            </div>
        </a-row>

        <div class="border-bottom" />
    </div>
</template>

<script>
    export default {
        name: 'HeaderTitleMobile',
        props: {
            to: {
                required: false,
                default: ''
            },
            title: {
                required: true,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>
