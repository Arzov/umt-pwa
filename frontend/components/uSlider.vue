<template>
    <div u-slider>
        <label>{{ title }}</label>

        <label v-if="range[1] == 60" class="range">{{ range[0] }} - {{ range[1] }}+</label>
        <label v-else class="range">{{ range[0] }} - {{ range[1] }}</label>
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'USlider',
        props: {
            title: {
                required: false,
                default: ''
            },
            range: {
                required: false,
                default: [0, 0]
            }
        }
    }
</script>

<style scoped>

</style>
