<template>
    <u-slider title="rango de edad" :range="value">
        <a-slider
            range
            :default-value="value"
            :min="ageRange.min"
            :max="ageRange.max"
            @change="setAge"
        />
    </u-slider>
</template>

<script>
    import USlider from './uSlider'
    export default {
        name: 'AgeFilterInput',
        components: { USlider },
        props: ['value'],
        data () {
            return {
                ageRange: {
                    min: 18,
                    max: 60,
                    default: [18, 22]
                }
            }
        },
        methods: {
            setAge (event) {
                this.$emit('input', event)
            }
        }
    }
</script>

<style scoped>

</style>
