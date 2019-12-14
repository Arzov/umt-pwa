<template>
    <div>
        <a-slider range :default-value="value" :min="ageRange.min" :max="ageRange.max" @change="setAge" />
    </div>
</template>

<script>
    export default {
        name: 'AgeFilterInput',
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
